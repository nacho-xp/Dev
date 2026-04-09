"use client";

// src/components/admin/users/user-row.tsx
import { useState } from "react";
import Link from "next/link";
import { Trash2, Eye, Calendar } from "lucide-react";
import { deleteUser } from "@/actions/user.actions";

const LANG_LABEL: Record<string, string> = {
  ES: "Español", EN: "English", PT: "Português", FR: "Français",
};

type UserRowProps = {
  user: {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    hasVisualImpairment: boolean;
    preferredLanguage: string;
    createdAt: Date;
    _count: { appointments: number };
  };
};

export default function UserRow({ user }: UserRowProps) {
  const [deleting, setDeleting] = useState(false);

  async function handleDelete(e: React.MouseEvent) {
    e.preventDefault();
    if (!confirm(`¿Eliminar al usuario "${user.name}"?`)) return;
    setDeleting(true);
    await deleteUser(user.id);
  }

  return (
    <Link
      href={`/admin/users/${user.id}/edit`}
      className={`
        group relative flex items-center gap-0
        border border-rule bg-cream hover:bg-paper
        transition-colors duration-200
        ${deleting ? "opacity-40 pointer-events-none" : ""}
      `}
    >
      {/* Franja de accesibilidad */}
      <div className={`
        w-1.5 flex-shrink-0 transition-colors duration-300
        ${user.hasVisualImpairment
          ? "bg-dorado/60 group-hover:bg-dorado"
          : "bg-rule group-hover:bg-ink-low"}
      `} />

      {/* Iniciales avatar */}
      <div className="
        w-14 h-14 flex-shrink-0 mx-6
        flex items-center justify-center
        border border-rule bg-paper
        font-serif text-[18px] font-light text-ink-mid
      ">
        {user.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()}
      </div>

      {/* Info principal */}
      <div className="flex-1 py-5">
        <div className="flex items-center gap-3 mb-1">
          <h3 className="font-serif font-light text-[20px] leading-none text-ink">
            {user.name}
          </h3>
          {user.hasVisualImpairment && (
            <span className="flex items-center gap-1 font-sans text-[9px] tracking-[0.2em] uppercase text-dorado border border-dorado/30 px-2 py-0.5">
              <Eye size={9} />
              Accesible
            </span>
          )}
        </div>
        <p className="font-sans text-[12px] text-ink-low">{user.email}</p>
        {user.phone && (
          <p className="font-sans text-[11px] text-ink-low mt-0.5">{user.phone}</p>
        )}
      </div>

      {/* Idioma */}
      <div className="w-[140px] flex-shrink-0 border-l border-rule px-6 py-5">
        <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-ink-low mb-1">Idioma</p>
        <p className="font-sans text-[13px] text-ink">
          {LANG_LABEL[user.preferredLanguage] ?? user.preferredLanguage}
        </p>
      </div>

      {/* Turnos */}
      <div className="w-[140px] flex-shrink-0 border-l border-rule px-6 py-5">
        <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-ink-low mb-1">Turnos</p>
        <p className="flex items-center gap-1.5 font-sans text-[13px] text-ink">
          <Calendar size={11} className="stroke-dorado" />
          {user._count.appointments}
        </p>
      </div>

      {/* Fecha registro */}
      <div className="w-[160px] flex-shrink-0 border-l border-rule px-6 py-5">
        <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-ink-low mb-1">Registro</p>
        <p className="font-sans text-[12px] text-ink-mid">
          {new Date(user.createdAt).toLocaleDateString("es-AR", {
            day: "2-digit", month: "short", year: "numeric",
          })}
        </p>
      </div>

      {/* Botón eliminar */}
      <button
        onClick={handleDelete}
        className="
          absolute top-4 right-4
          opacity-0 group-hover:opacity-100
          w-8 h-8 flex items-center justify-center
          border border-rule bg-cream
          hover:bg-red-50 hover:border-red-300
          transition-all duration-200 z-10
        "
        title="Eliminar usuario"
      >
        <Trash2 size={14} className="stroke-ink-low hover:stroke-red-500" />
      </button>
    </Link>
  );
}