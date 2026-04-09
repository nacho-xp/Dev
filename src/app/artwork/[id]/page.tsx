import MaxWidthWrapper from "@/components/layout/max-width-wrapper";
import ArtworkDetail from "@/components/artwork/artwork-detail";
import prisma from "@/lib/prisma";
import Navbar from "@/components/layout/navbar";
export default async function ArtworkInfoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const artwork = await prisma.artwork.findUnique({
    where: { id: Number(id) },
  });

  if (!artwork) return <div>No encontrado</div>;

  return (
    <MaxWidthWrapper>
      <Navbar></Navbar>
      <ArtworkDetail artwork={artwork} />
    </MaxWidthWrapper>
  );
}
