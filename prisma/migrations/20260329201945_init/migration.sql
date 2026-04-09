-- CreateEnum
CREATE TYPE "Language" AS ENUM ('ES', 'EN', 'PT', 'FR');

-- CreateEnum
CREATE TYPE "AppointmentStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED');

-- CreateTable
CREATE TABLE "Museum" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "website" TEXT,
    "logoUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Museum_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room" (
    "id" SERIAL NOT NULL,
    "museumId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "floor" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artwork" (
    "id" SERIAL NOT NULL,
    "roomId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "artist" TEXT,
    "year" TEXT,
    "technique" TEXT,
    "description" TEXT NOT NULL,
    "narration" TEXT NOT NULL,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Artwork_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Beepcon" (
    "id" SERIAL NOT NULL,
    "roomId" INTEGER NOT NULL,
    "artworkId" INTEGER NOT NULL,
    "bleIdentifier" TEXT NOT NULL,
    "serviceUUID" TEXT NOT NULL,
    "characteristicUUID" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Beepcon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tour" (
    "id" SERIAL NOT NULL,
    "museumId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "language" "Language" NOT NULL DEFAULT 'ES',
    "duration" INTEGER,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tour_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TourStop" (
    "id" SERIAL NOT NULL,
    "tourId" INTEGER NOT NULL,
    "artworkId" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "TourStop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "hasVisualImpairment" BOOLEAN NOT NULL DEFAULT false,
    "preferredLanguage" "Language" NOT NULL DEFAULT 'ES',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "tourId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "status" "AppointmentStatus" NOT NULL DEFAULT 'PENDING',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Alert" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "beepconId" INTEGER NOT NULL,
    "position" TEXT NOT NULL,
    "message" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Alert_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FloorPlan" (
    "id" SERIAL NOT NULL,
    "museumId" INTEGER NOT NULL,
    "floor" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FloorPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MuseumEvent" (
    "id" SERIAL NOT NULL,
    "museumId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MuseumEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SimulatedEvent" (
    "id" SERIAL NOT NULL,
    "beepconId" INTEGER NOT NULL,
    "triggeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "triggeredBy" TEXT,

    CONSTRAINT "SimulatedEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Beepcon_artworkId_key" ON "Beepcon"("artworkId");

-- CreateIndex
CREATE UNIQUE INDEX "Beepcon_bleIdentifier_key" ON "Beepcon"("bleIdentifier");

-- CreateIndex
CREATE UNIQUE INDEX "TourStop_tourId_artworkId_key" ON "TourStop"("tourId", "artworkId");

-- CreateIndex
CREATE UNIQUE INDEX "TourStop_tourId_order_key" ON "TourStop"("tourId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Appointment_userId_tourId_date_key" ON "Appointment"("userId", "tourId", "date");

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_museumId_fkey" FOREIGN KEY ("museumId") REFERENCES "Museum"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Artwork" ADD CONSTRAINT "Artwork_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Beepcon" ADD CONSTRAINT "Beepcon_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Beepcon" ADD CONSTRAINT "Beepcon_artworkId_fkey" FOREIGN KEY ("artworkId") REFERENCES "Artwork"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tour" ADD CONSTRAINT "Tour_museumId_fkey" FOREIGN KEY ("museumId") REFERENCES "Museum"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TourStop" ADD CONSTRAINT "TourStop_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "Tour"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TourStop" ADD CONSTRAINT "TourStop_artworkId_fkey" FOREIGN KEY ("artworkId") REFERENCES "Artwork"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "Tour"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alert" ADD CONSTRAINT "Alert_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alert" ADD CONSTRAINT "Alert_beepconId_fkey" FOREIGN KEY ("beepconId") REFERENCES "Beepcon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FloorPlan" ADD CONSTRAINT "FloorPlan_museumId_fkey" FOREIGN KEY ("museumId") REFERENCES "Museum"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MuseumEvent" ADD CONSTRAINT "MuseumEvent_museumId_fkey" FOREIGN KEY ("museumId") REFERENCES "Museum"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SimulatedEvent" ADD CONSTRAINT "SimulatedEvent_beepconId_fkey" FOREIGN KEY ("beepconId") REFERENCES "Beepcon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
