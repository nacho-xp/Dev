"use server";

// src/actions/appointment.actions.ts
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { AppointmentStatus } from "@/generated/prisma/enums";

export async function createAppointment(formData: FormData) {
  const userId = Number(formData.get("userId"));
  const tourId = Number(formData.get("tourId"));
  const date = formData.get("date") as string;
  const notes = formData.get("notes") as string | null;

  if (!userId || !tourId || !date) {
    return { error: "userId, tourId y date son obligatorios" };
  }

  try {
    const appointment = await prisma.appointment.create({
      data: { userId, tourId, date: new Date(date), notes, status: "PENDING" },
    });
    revalidatePath("/admin/appointments");
    return { data: appointment };
  } catch {
    return {
      error:
        "Error al crear el turno. Puede que ya tengas uno reservado en ese horario.",
    };
  }
}

export async function updateAppointmentStatus(
  id: number,
  status: AppointmentStatus,
) {
  try {
    const appointment = await prisma.appointment.update({
      where: { id },
      data: { status },
    });
    revalidatePath("/admin/appointments");
    return { data: appointment };
  } catch {
    return { error: "Error al actualizar el estado del turno" };
  }
}
