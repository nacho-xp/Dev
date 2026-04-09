"use client";

// src/components/admin/ArtworkRow.tsx
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
        group relative flex items-stretch gap-0
        border border-rule hover:border-black bg-cream
        hover:bg-paper
        transition-colors duration-200
        ${deleting ? "opacity-40 pointer-events-none" : ""}
      `}
    >
      {/* Imagen */}
      <div className="w-30 shrink-0 overflow-hidden bg-paper border-r border-rule">
        {artwork.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={artwork.imageUrl}
            alt={artwork.title}
            className="w-full h-full object-cover aspect-3/4"
          />
        ) : (
          <div className="w-full aspect-3/4 flex items-center justify-center">
            <span className="font-sans text-[9px] tracking-[0.15em] uppercase text-ink-low text-center px-2">
              Sin imagen
            </span>
          </div>
        )}
      </div>

      {/* Datos */}
      <div className="flex-1 px-8 py-6 flex flex-col justify-center">
        {/* Sala */}
        <p className="font-sans text-[9px] tracking-[0.24em] uppercase text-dorado mb-2">
          {artwork.room.name}
        </p>

        {/* Título */}
        <h3 className="font-serif font-light text-[22px] leading-[1.2] text-ink mb-1">
          {artwork.title}
        </h3>

        {/* Artista / año / técnica */}
        <p className="font-serif italic text-[14px] text-ink-mid mb-3">
          {[artwork.artist, artwork.year, artwork.technique]
            .filter(Boolean)
            .join(" · ")}
        </p>

        {/* Descripción truncada */}
        <p className="font-sans text-[12px] leading-[1.7] text-ink-low line-clamp-2 max-w-2xl">
          {artwork.description}
        </p>
      </div>

      {/* Narración — columna derecha */}
      <div className="w-65 shrink-0 border-l border-rule px-6 py-6 flex flex-col justify-center">
        <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-ink-low mb-2">
          Narración (TTS)
        </p>
        <p className="font-sans text-[12px] leading-[1.7] text-ink-mid line-clamp-4">
          {artwork.narration}
        </p>
      </div>

      {/* Botón eliminar — aparece en hover */}
      <button
        onClick={handleDelete}
        className="
          absolute top-4 right-4 hover:cursor-pointer
          opacity-0 group-hover:opacity-100
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