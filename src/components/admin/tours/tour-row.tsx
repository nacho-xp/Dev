"use client";

// src/components/admin/TourRow.tsx
import { useState } from "react";
import Link from "next/link";
import { Trash2, Clock, Users, Globe } from "lucide-react";
import { deleteTour } from "@/actions/tour.actions";

const LANG_LABEL: Record<string, string> = {
  ES: "Español", EN: "English", PT: "Português", FR: "Français",
};

type TourRowProps = {
  tour: {
    id: number;
    name: string;
    description: string | null;
    language: string;
    duration: number | null;
    isActive: boolean;
    artworks: { id: number; title: string; imageUrl: string | null }[];
    _count: { appointments: number };
  };
};

export default function TourRow({ tour }: TourRowProps) {
  const [deleting, setDeleting] = useState(false);

  async function handleDelete(e: React.MouseEvent) {
    e.preventDefault();
    if (!confirm(`¿Eliminar el tour "${tour.name}"?`)) return;
    setDeleting(true);
    await deleteTour(tour.id);
  }

  return (
    <Link
      href={`/admin/tours/${tour.id}/edit`}
      className={`group relative flex items-stretch border border-rule hover:border-black bg-cream hover:bg-paper transition-colors duration-200 ${deleting ? "opacity-40 pointer-events-none" : ""}`}
    >
      {/* <div className="w-1.5 flex-shrink-0  group-hover:bg-dorado transition-colors duration-300 bg-red-300" /> */}

      <div className="flex-1 px-8 py-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="flex items-center gap-1.5 font-sans text-[9px] tracking-[0.22em] uppercase text-dorado">
            <Globe size={10} />{LANG_LABEL[tour.language] ?? tour.language}
          </span>
          {tour.duration && (
            <span className="flex items-center gap-1.5 font-sans text-[9px] tracking-[0.15em] uppercase text-ink-low">
              <Clock size={10} />{tour.duration} min
            </span>
          )}
          <span className="flex items-center gap-1.5 font-sans text-[9px] tracking-[0.15em] uppercase text-ink-low">
            <Users size={10} />{tour._count.appointments} reservas
          </span>
          {!tour.isActive && (
            <span className="font-sans text-[9px] tracking-[0.15em] uppercase text-ink-low bg-paper px-2 py-0.5 border border-rule">
              Inactivo
            </span>
          )}
        </div>
        <h3 className="font-serif font-light text-[22px] leading-[1.2] text-ink mb-2">{tour.name}</h3>
        {tour.description && (
          <p className="font-sans text-[12px] leading-[1.7] text-ink-low line-clamp-2 max-w-2xl">{tour.description}</p>
        )}
      </div>

      <div className="w-[300px] flex-shrink-0 border-l border-rule px-6 py-6">
        <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-ink-low mb-4">
          {tour.artworks.length} obra{tour.artworks.length !== 1 ? "s" : ""}
        </p>
        {tour.artworks.length === 0 ? (
          <p className="font-sans text-[11px] text-ink-low italic">Sin obras asignadas</p>
        ) : (
          <div className="flex flex-col gap-2">
            {tour.artworks.slice(0, 4).map((artwork, i) => (
              <div key={artwork.id} className="flex items-center gap-3">
                <div className="w-8 h-10 flex-shrink-0 border border-rule overflow-hidden bg-paper">
                  {artwork.imageUrl
                    // eslint-disable-next-line @next/next/no-img-element
                    ? <img src={artwork.imageUrl} alt={artwork.title} className="w-full h-full object-cover" />
                    : <div className="w-full h-full bg-paper" />}
                </div>
                <span className="font-sans text-[11px] text-ink-mid line-clamp-1">
                  <span className="text-dorado mr-1.5">{i + 1}.</span>{artwork.title}
                </span>
              </div>
            ))}
            {tour.artworks.length > 4 && (
              <p className="font-sans text-[10px] text-ink-low pl-11">+{tour.artworks.length - 4} más…</p>
            )}
          </div>
        )}
      </div>

      <button
        onClick={handleDelete}
        className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 w-8 h-8 flex items-center justify-center border border-rule bg-cream hover:bg-red-50 hover:border-red-300 transition-all duration-200 z-10"
        title="Eliminar tour"
      >
        <Trash2 size={14} className="stroke-ink-low hover:stroke-red-500" />
      </button>
    </Link>
  );
}