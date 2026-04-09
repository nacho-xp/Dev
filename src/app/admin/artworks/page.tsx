// src/app/(admin)/artworks/page.tsx
import Link from "next/link";
import prisma from "@/lib/prisma";
import Header from "@/components/admin/header";
import ArtworkRow from "./artwork-row";
import { Plus } from "lucide-react";


export default async function ArtworksPage() {
  const artworks = await prisma.artwork.findMany({
    include: {
      room: { select: { name: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-cream px-14 py-12">
      <Header />

      {/* Subheader con título de sección y botón agregar */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-baseline gap-4">
          <span className="font-serif text-[13px] tracking-[0.1em] text-dorado">
            01
          </span>
          <h2 className="font-serif font-light text-[28px] text-ink">
            Obras de <em className="italic text-dorado">arte</em>
          </h2>
        </div>

        <Link
          href="/admin/artworks/new"
          className="
            black-button gap-3
          "
        >
          <Plus size={14} />
          Nueva obra
        </Link>
      </div>

      <div className="h-px bg-rule mb-8" />

      {/* Lista de obras */}
      {artworks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 border border-rule">
          <p className="font-serif text-[20px] font-light text-ink-low mb-4">
            Sin obras todavía
          </p>
          <Link
            href="/admin/artworks/new"
            className="font-sans text-[11px] tracking-[0.2em] uppercase text-dorado border-b border-dorado/30 hover:border-dorado pb-0.5 transition-colors"
          >
            Agregar la primera obra
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-0.5">
          {artworks.map((artwork) => (
            <ArtworkRow key={artwork.id} artwork={artwork} />
          ))}
        </div>
      )}
    </div>
  );
}
