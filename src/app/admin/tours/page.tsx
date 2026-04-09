// src/app/(admin)/tours/page.tsx
import Link from "next/link";
import prisma from "@/lib/prisma";
import Header from "@/components/admin/header";
import TourRow from "@/components/admin/tours/tour-row";
import { Plus } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ToursPage() {
  const tours = await prisma.tour.findMany({
    include: {
      artworks: { select: { id: true, title: true, imageUrl: true } },
      _count: { select: { appointments: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-cream px-14 py-12">
      <Header />

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-baseline gap-4">
          <span className="font-serif text-[13px] tracking-[0.1em] text-dorado">02</span>
          <h2 className="font-serif font-light text-[28px] text-ink">
            Visitas <em className="italic text-dorado">guiadas</em>
          </h2>
        </div>
        <Link
          href="/admin/tours/new"
          className="flex items-center gap-2 px-6 py-3 bg-ink text-cream font-sans text-[11px] tracking-[0.2em] uppercase hover:bg-dorado hover:-translate-y-px transition-all duration-200"
        >
          <Plus size={14} />
          Nuevo tour
        </Link>
      </div>

      <div className="h-px bg-rule mb-8" />

      {tours.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 border border-rule">
          <p className="font-serif text-[20px] font-light text-ink-low mb-4">Sin tours todavía</p>
          <Link href="/admin/tours/new" className="font-sans text-[11px] tracking-[0.2em] uppercase text-dorado border-b border-dorado/30 hover:border-dorado pb-0.5 transition-colors">
            Crear el primero
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-0.5">
          {tours.map((tour) => (
            <TourRow key={tour.id} tour={tour} />
          ))}
        </div>
      )}
    </div>
  );
}