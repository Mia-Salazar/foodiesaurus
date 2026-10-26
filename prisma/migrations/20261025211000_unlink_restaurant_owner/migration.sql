-- DropForeignKey
ALTER TABLE "restaurants" DROP CONSTRAINT "restaurants_ownerId_fkey";

-- AlterTable
ALTER TABLE "restaurants" ALTER COLUMN "ownerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "restaurants" ADD CONSTRAINT "restaurants_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
