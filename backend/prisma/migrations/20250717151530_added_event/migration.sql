-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "shortDesc" TEXT NOT NULL,
    "heroImageUrl" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "timing" TEXT NOT NULL,
    "registerLink" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Speaker" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,

    CONSTRAINT "Speaker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Venue" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "landmark" TEXT,
    "googleMapUrl" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,

    CONSTRAINT "Venue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WhyAttendPoint" (
    "id" TEXT NOT NULL,
    "point" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,

    CONSTRAINT "WhyAttendPoint_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Venue_eventId_key" ON "Venue"("eventId");

-- AddForeignKey
ALTER TABLE "Speaker" ADD CONSTRAINT "Speaker_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venue" ADD CONSTRAINT "Venue_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WhyAttendPoint" ADD CONSTRAINT "WhyAttendPoint_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
