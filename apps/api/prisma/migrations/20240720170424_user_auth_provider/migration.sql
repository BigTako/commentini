-- CreateEnum
CREATE TYPE "AuthProvider" AS ENUM ('GOOGLE', 'LOCAL');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "authProvider" "AuthProvider" NOT NULL DEFAULT 'LOCAL',
ALTER COLUMN "password" DROP NOT NULL;
