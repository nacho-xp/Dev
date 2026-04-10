// src/app/admin/users/[id]/edit/page.tsx
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import Header from "@/components/admin/header";
import UserForm from "@/components/admin/users/user-form";

export default async function EditUserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [user, tours] = await Promise.all([
    prisma.user.findUnique({
      where: { id: Number(id) },
      include: {
        appointments: {
          include: {
            tour: { select: { id: true, name: true, language: true } },
          },
          orderBy: { date: "desc" },
        },
        _count: {
          select: { appointments: true },
        },
      },
    }),
    prisma.tour.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" },
      select: { id: true, name: true, language: true, duration: true },
    }),
  ]);

  if (!user) notFound();

  return (
    <div className="min-h-screen bg-cream px-14 py-12">
      <Header />
      <UserForm  user={user} />
    </div>
  );
}
