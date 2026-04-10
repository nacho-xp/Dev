// src/app/(public)/artworks/page.tsx
import prisma from "@/lib/prisma";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import ArtworkMasonryGrid from "@/components/artworks/artworks-mansory-grid";
import MaxWidthWrapper from "@/components/layout/max-width-wrapper";

export const dynamic = "force-dynamic";

export default async function ArtworksPage() {
  const artworks = await prisma.artwork.findMany({
    include: {
      room: { select: { name: true } },
    },
    orderBy: { createdAt: "asc" },
  });

  return (
    <>
      <Navbar />
      <MaxWidthWrapper>
        <main className="min-h-screen bg-cream pt-18">
          {/* Header de sección */}
          <div className="xl:px-14 py-14 border-b border-rule">
            <p className="font-sans text-[10px] tracking-[0.32em] uppercase text-dorado mb-4">
              COLECCIÓN
            </p>
            <div className="flex items-end justify-between gap-8">
              <h1 className="font-serif font-light text-[clamp(36px,4vw,64px)] leading-[1.05] text-ink">
                Obras de <em className="italic text-dorado">arte</em>
              </h1>
              <p className="font-sans text-[13px] text-ink-low pb-1">
                {artworks.length} obra{artworks.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>

          {/* Grilla */}
          <div className="px-8 py-10">
            {artworks.length === 0 ? (
              <div className="flex items-center justify-center py-32">
                <p className="font-serif text-[20px] font-light text-ink-low">
                  Sin obras cargadas todavía
                </p>
              </div>
            ) : (
              <ArtworkMasonryGrid artworks={artworks} />
            )}
          </div>
        </main>
      </MaxWidthWrapper>

      <Footer />
    </>
  );
}
