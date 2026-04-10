// src/app/admin/users/new/page.tsx
import prisma from "@/lib/prisma";
import Header from "@/components/admin/header";
import UserForm from "@/components/admin/users/user-form";

export default async function NewUserPage() {
  const tours = await prisma.tour.findMany({
    where: { isActive: true },
    orderBy: { name: "asc" },
    select: { id: true, name: true, language: true, duration: true },
  });

  return (
    <div className="min-h-screen bg-cream xl:px-14 py-12">
      <Header />
    </div>
  );
}