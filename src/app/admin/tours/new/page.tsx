// src/app/(admin)/tours/new/page.tsx
import prisma from "@/lib/prisma";
import Header from "@/components/admin/header";
import TourForm from "@/components/admin/tours/tour-form";

export default async function NewTourPage() {
  const [museum, artworks] = await Promise.all([
    prisma.museum.findFirst({ select: { id: true } }),
    prisma.artwork.findMany({
      orderBy: { title: "asc" },
      select: { id: true, title: true, artist: true, imageUrl: true },
    }),
  ]);

  return (
    <div className="min-h-screen bg-cream xl:px-14 py-12">
      <Header />
      <TourForm museumId={museum?.id ?? 1} artworks={artworks} />
    </div>
  );
}