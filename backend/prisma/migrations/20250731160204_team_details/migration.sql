-- CreateTable
CREATE TABLE "TeamMember" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TeamMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AboutLine" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "teamMemberId" INTEGER NOT NULL,

    CONSTRAINT "AboutLine_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AboutLine" ADD CONSTRAINT "AboutLine_teamMemberId_fkey" FOREIGN KEY ("teamMemberId") REFERENCES "TeamMember"("id") ON DELETE CASCADE ON UPDATE CASCADE;
