"use client";

// src/components/artwork/ArtworkMasonryGrid.tsx
import { useState } from "react";
import ArtworkMasonryCard from "./artworks-mansory-card";

type Artwork = {
  id: number;
  title: string;
  artist: string | null;
  year: string | null;
  technique: string | null;
  imageUrl: string | null;
  room: { name: string };
};

export default function ArtworkMasonryGrid({ artworks }: { artworks: Artwork[] }) {
  const [search, setSearch] = useState("");

  const filtered = artworks.filter((a) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      a.title.toLowerCase().includes(q) ||
      (a.artist ?? "").toLowerCase().includes(q) ||
      (a.technique ?? "").toLowerCase().includes(q)
    );
  });

  return (
    <div>
      {/* Barra de búsqueda */}
      <div className="max-w-sm mb-10">
        <input
          type="text"
          placeholder="Buscar por título, artista o técnica…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-line text-[13px]"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="font-serif text-[18px] font-light text-ink-low py-16 text-center">
          Sin resultados para &ldquo;{search}&rdquo;
        </p>
      ) : (
        /*
          CSS columns: cada ítem conserva su aspect ratio natural.
          break-inside-avoid evita que una card se corte entre columnas.
        */
        <div
          className="
            columns-1 md:columns-3 lg:columns-4
            gap-1
          "
        >
          {filtered.map((artwork) => (
            <div key={artwork.id} className="break-inside-avoid mb-1">
              <ArtworkMasonryCard artwork={artwork} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}