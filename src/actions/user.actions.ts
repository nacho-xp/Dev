"use server";

// src/actions/user.actions.ts
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { Language } from "@/generated/prisma/enums";
export async function createUser(formData: FormData) {
  const name                = formData.get("name") as string;
  const email               = formData.get("email") as string;
  const phone               = formData.get("phone") as string | null;
  const hasVisualImpairment = formData.get("hasVisualImpairment") === "true";
  const preferredLanguage   = formData.get("preferredLanguage") as Language;

  if (!name || !email) {
    return { error: "Nombre y email son obligatorios" };
  }

  try {
    const user = await prisma.user.create({
      data: { name, email, phone: phone || null, hasVisualImpairment, preferredLanguage },
    });
    revalidatePath("/admin/users");
    return { data: user };
  } catch {
    return { error: "Error al crear el usuario. El email puede estar en uso." };
  }
}

export async function updateUser(id: number, formData: FormData) {
  const name                = formData.get("name") as string;
  const email               = formData.get("email") as string;
  const phone               = formData.get("phone") as string | null;
  const hasVisualImpairment = formData.get("hasVisualImpairment") === "true";
  const preferredLanguage   = formData.get("preferredLanguage") as Language;

  try {
    const user = await prisma.user.update({
      where: { id },
      data: { name, email, phone: phone || null, hasVisualImpairment, preferredLanguage },
    });
    revalidatePath("/admin/users");
    revalidatePath(`/admin/users/${id}/edit`);
    return { data: user };
  } catch {
    return { error: "Error al actualizar el usuario." };
  }
}

export async function deleteUser(id: number) {
  try {
    await prisma.user.delete({ where: { id } });
    revalidatePath("/admin/users");
    return { success: true };
  } catch {
    return { error: "Error al eliminar el usuario." };
  }
}

export async function createAppointmentForUser(formData: FormData) {
  const userId = Number(formData.get("userId"));
  const tourId = Number(formData.get("tourId"));
  const date   = formData.get("date") as string;
  const notes  = formData.get("notes") as string | null;

  if (!userId || !tourId || !date) {
    return { error: "userId, tourId y date son obligatorios" };
  }

  try {
    const appointment = await prisma.appointment.create({
      data: {
        userId,
        tourId,
        date: new Date(date),
        notes: notes || null,
        status: "PENDING",
      },
    });
    revalidatePath(`/admin/users/${userId}/edit`);
    return { data: appointment };
  } catch {
    return { error: "Error al crear el turno. Puede que ya exista uno igual." };
  }
}

export async function updateAppointmentStatus(
  id: number,
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED",
  userId: number
) {
  try {
    const appointment = await prisma.appointment.update({
      where: { id },
      data: { status },
    });
    revalidatePath(`/admin/users/${userId}/edit`);
    return { data: appointment };
  } catch {
    return { error: "Error al actualizar el estado del turno." };
  }
}