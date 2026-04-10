// src/app/(admin)/artworks/new/page.tsx
import prisma from "@/lib/prisma";
import Header from "@/components/admin/header";
import ArtworkForm from "../artwork-form";
export default async function NewArtworkPage() {
  const rooms = await prisma.room.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true },
  });

  return (
    <div className="min-h-screen bg-cream xl:px-14 py-12">
      <Header />
      <ArtworkForm rooms={rooms} />
    </div>
  );
}