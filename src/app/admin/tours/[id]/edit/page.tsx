// src/app/(admin)/tours/[id]/edit/page.tsx
import { notFound } from "next/navigation";

import prisma from "@/lib/prisma";
import Header from "@/components/admin/header";
import TourForm from "@/components/admin/tours/tour-form";

export default async function EditTourPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [tour, artworks] = await Promise.all([
    prisma.tour.findUnique({
      where: { id: Number(id) },
      include: {
        artworks: { select: { id: true, title: true, artist: true, imageUrl: true } },
      },
    }),
    prisma.artwork.findMany({
      orderBy: { title: "asc" },
      select: { id: true, title: true, artist: true, imageUrl: true },
    }),
  ]);

  if (!tour) notFound();

  return (
    <div className="min-h-screen bg-cream xl:px-14 py-12">
      <Header />
      <TourForm museumId={tour.museumId} artworks={artworks} tour={tour} />
    </div>
  );
}