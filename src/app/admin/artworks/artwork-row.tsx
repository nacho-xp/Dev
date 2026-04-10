"use client";

import { useState } from "react";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { deleteArtwork } from "@/actions/artwork.actions";

type ArtworkRowProps = {
  artwork: {
    id: number;
    title: string;
    artist: string | null;
    year: string | null;
    technique: string | null;
    description: string;
    narration: string;
    imageUrl: string | null;
    room: { name: string };
  };
};

export default function ArtworkRow({ artwork }: ArtworkRowProps) {
  const [deleting, setDeleting] = useState(false);

  async function handleDelete(e: React.MouseEvent) {
    e.preventDefault();
    if (!confirm(`¿Eliminar "${artwork.title}"?`)) return;
    setDeleting(true);
    await deleteArtwork(artwork.id);
  }

  return (
    <Link
      href={`/admin/artworks/${artwork.id}/edit`}
      className={`
        group relative flex flex-col md:flex-row
        border border-rule hover:border-black bg-cream
        hover:bg-paper
        transition-colors duration-200
        ${deleting ? "opacity-40 pointer-events-none" : ""}
      `}
    >
      {/* Imagen */}
      <div className="w-full md:w-32 shrink-0 overflow-hidden bg-paper border-b md:border-b-0 md:border-r border-rule">
        {artwork.imageUrl ? (
          <img
            src={artwork.imageUrl}
            alt={artwork.title}
            className="w-full h-full object-cover aspect-[3/4]"
          />
        ) : (
          <div className="w-full aspect-[3/4] flex items-center justify-center">
            <span className="font-sans text-[10px] tracking-[0.15em] uppercase text-ink-low text-center px-2">
              Sin imagen
            </span>
          </div>
        )}
      </div>

      {/* Datos */}
      <div className="flex-1 px-4 md:px-8 py-4 md:py-6 flex flex-col justify-center">
        <p className="font-sans text-[9px] tracking-[0.24em] uppercase text-dorado mb-1 md:mb-2">
          {artwork.room.name}
        </p>

        <h3 className="font-serif font-light text-[18px] md:text-[22px] leading-[1.2] text-ink mb-1">
          {artwork.title}
        </h3>

        <p className="font-serif italic text-[13px] md:text-[14px] text-ink-mid mb-2 md:mb-3">
          {[artwork.artist, artwork.year, artwork.technique]
            .filter(Boolean)
            .join(" · ")}
        </p>

        <p className="font-sans text-[12px] leading-[1.6] text-ink-low line-clamp-2 md:max-w-2xl">
          {artwork.description}
        </p>
      </div>

      {/* Narración */}
      <div className="
        w-full md:w-64 shrink-0
        border-t md:border-t-0 md:border-l border-rule
        px-4 md:px-6 py-4 md:py-6
        flex flex-col justify-center
      ">
        <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-ink-low mb-1 md:mb-2">
          Narración (TTS)
        </p>
        <p className="font-sans text-[12px] leading-[1.6] text-ink-mid line-clamp-3 md:line-clamp-4">
          {artwork.narration}
        </p>
      </div>

      {/* Botón eliminar */}
      <button
        onClick={handleDelete}
        className="
          absolute top-3 right-3 md:top-4 md:right-4
          opacity-100 md:opacity-0 md:group-hover:opacity-100
          w-8 h-8 flex items-center justify-center
          border border-rule bg-cream
          hover:bg-red-50 hover:border-red-300
          transition-all duration-200
          z-10
        "
        title="Eliminar obra"
      >
        <Trash2
          size={14}
          className="stroke-ink-low group-hover:stroke-red-500 transition-colors"
        />
      </button>
    </Link>
  );
}
