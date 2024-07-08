-- AlterTable
ALTER TABLE "User" ALTER COLUMN "firstName" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Vibe" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "imgUrl" TEXT,
    "authorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vibe_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Vibe" ADD CONSTRAINT "Vibe_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
