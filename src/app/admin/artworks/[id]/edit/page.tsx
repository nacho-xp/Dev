// src/app/(admin)/artworks/[id]/edit/page.tsx
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import Header from "@/components/admin/header";
import ArtworkForm from "../../artwork-form";

export default async function EditArtworkPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [artwork, rooms] = await Promise.all([
    prisma.artwork.findUnique({
      where: { id: Number(id) },
    }),
    prisma.room.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true },
    }),
  ]);

  if (!artwork) notFound();

  return (
    <div className="min-h-screen bg-cream xl:px-14 py-12">
      <Header />
      <ArtworkForm rooms={rooms} artwork={artwork} />
    </div>
  );
}