/*
  Warnings:

  - You are about to drop the `_PostReplies` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_PostReplies" DROP CONSTRAINT "_PostReplies_A_fkey";

-- DropForeignKey
ALTER TABLE "_PostReplies" DROP CONSTRAINT "_PostReplies_B_fkey";

-- AlterTable
ALTER TABLE "post" ADD COLUMN     "parentId" TEXT;

-- DropTable
DROP TABLE "_PostReplies";

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
