/*
  Warnings:

  - You are about to drop the column `email` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "post" DROP COLUMN "email",
DROP COLUMN "username",
ADD COLUMN     "userId" TEXT;

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(320) NOT NULL,
    "username" VARCHAR(128) NOT NULL,
    "password" VARCHAR(32) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
