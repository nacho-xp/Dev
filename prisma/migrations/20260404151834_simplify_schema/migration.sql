/*
  Warnings:

  - You are about to drop the `Alert` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FloorPlan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MuseumEvent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SimulatedEvent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TourStop` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Alert" DROP CONSTRAINT "Alert_beepconId_fkey";

-- DropForeignKey
ALTER TABLE "Alert" DROP CONSTRAINT "Alert_userId_fkey";

-- DropForeignKey
ALTER TABLE "FloorPlan" DROP CONSTRAINT "FloorPlan_museumId_fkey";

-- DropForeignKey
ALTER TABLE "MuseumEvent" DROP CONSTRAINT "MuseumEvent_museumId_fkey";

-- DropForeignKey
ALTER TABLE "SimulatedEvent" DROP CONSTRAINT "SimulatedEvent_beepconId_fkey";

-- DropForeignKey
ALTER TABLE "TourStop" DROP CONSTRAINT "TourStop_artworkId_fkey";

-- DropForeignKey
ALTER TABLE "TourStop" DROP CONSTRAINT "TourStop_tourId_fkey";

-- DropTable
DROP TABLE "Alert";

-- DropTable
DROP TABLE "FloorPlan";

-- DropTable
DROP TABLE "MuseumEvent";

-- DropTable
DROP TABLE "SimulatedEvent";

-- DropTable
DROP TABLE "TourStop";

-- CreateTable
CREATE TABLE "_ArtworkTours" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ArtworkTours_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ArtworkTours_B_index" ON "_ArtworkTours"("B");

-- AddForeignKey
ALTER TABLE "_ArtworkTours" ADD CONSTRAINT "_ArtworkTours_A_fkey" FOREIGN KEY ("A") REFERENCES "Artwork"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArtworkTours" ADD CONSTRAINT "_ArtworkTours_B_fkey" FOREIGN KEY ("B") REFERENCES "Tour"("id") ON DELETE CASCADE ON UPDATE CASCADE;
