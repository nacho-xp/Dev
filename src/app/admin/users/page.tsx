// src/app/admin/users/page.tsx
import Link from "next/link";
import prisma from "@/lib/prisma";
import Header from "@/components/admin/header";
import UserRow from "@/components/admin/users/user-row";
import { Plus } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function UsersPage() {
  const users = await prisma.user.findMany({
    include: {
      _count: { select: { appointments: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-cream xl:px-14 py-12">
      <Header />

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-baseline gap-4">
          <span className="font-serif text-[13px] tracking-[0.1em] text-dorado">03</span>
          <h2 className="font-serif font-light text-[28px] text-ink">
            Usuarios <em className="italic text-dorado">registrados</em>
          </h2>
        </div>

        <Link
          href="/admin/users/new"
          className="black-button gap-3"

        >
          <Plus size={14} />
          Nuevo usuario
        </Link>
      </div>

      <div className="h-px bg-rule mb-8" />

      {users.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 border border-rule">
          <p className="font-serif text-[20px] font-light text-ink-low mb-4">
            Sin usuarios todavía
          </p>
          <Link
            href="/admin/users/new"
            className="font-sans text-[11px] tracking-[0.2em] uppercase text-dorado border-b border-dorado/30 hover:border-dorado pb-0.5 transition-colors"
          >
            Agregar el primero
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-0.5">
          {users.map((user) => (
            <UserRow key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
}