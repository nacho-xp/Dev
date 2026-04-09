"use client";

// src/components/artwork/artwork-mansory-card.tsx
import { useState } from "react";
import Link from "next/link";

type ArtworkCardProps = {
  artwork: {
    id: number;
    title: string;
    artist: string | null;
    year: string | null;
    technique: string | null;
    imageUrl: string | null;
    room: { name: string };
  };
};

export default function ArtworkMasonryCard({ artwork }: ArtworkCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <Link
      href={`/artwork/${artwork.id}`}
      className="group block relative overflow-hidden bg-paper border border-rule hover:border-black transition-all"
    >
      {/* Imagen — sin aspect-ratio fijo para respetar proporciones reales */}
      {artwork.imageUrl && !imgError ? (
        <div className="relative overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={artwork.imageUrl}
            alt={artwork.title}
            className="
              w-full h-auto block
              transition-transform duration-500 ease-out
              group-hover:scale-110
            "
            onError={() => setImgError(true)}
          />

          {/* Overlay con gradiente que aparece en hover */}
          <div className="
            absolute inset-0
            bg-linear-to-t from-black/70 via-black/10 to-transparent
            opacity-0 group-hover:opacity-100
            transition-opacity duration-300
          " />

          {/* Texto hover — título y artista sobre la imagen */}
          <div className="
            absolute bottom-0 left-0 right-0 p-4
            translate-y-2 opacity-0
            group-hover:translate-y-0 group-hover:opacity-100
            transition-all duration-300
          ">
            <p className="font-serif font-light text-[15px] leading-[1.2] text-white line-clamp-2">
              {artwork.title}
            </p>
            {artwork.artist && (
              <p className="font-sans text-[11px] text-white/70 mt-1">
                {artwork.artist}
              </p>
            )}
          </div>
        </div>
      ) : (
        /* Placeholder si no hay imagen */
        <div className="w-full aspect-square flex flex-col items-center justify-center gap-2 bg-paper">
          <div className="w-8 h-px bg-dorado" />
          <p className="font-sans text-[10px] tracking-[0.15em] uppercase text-ink-low text-center px-4">
            Sin imagen
          </p>
        </div>
      )}

      {/* Info debajo de la imagen — siempre visible */}
      <div className="px-3 py-3 border-t border-rule/50">
        <h3 className="
          font-serif font-light text-[14px] leading-[1.3] text-ink
          line-clamp-2 mb-0.5
        ">
          {artwork.title}
        </h3>
        <p className="font-sans text-[11px] text-ink-low line-clamp-1">
          {[artwork.artist, artwork.year].filter(Boolean).join(". ")}
          {artwork.year && !artwork.artist ? "" : ""}
        </p>
      </div>
    </Link>
  );
}