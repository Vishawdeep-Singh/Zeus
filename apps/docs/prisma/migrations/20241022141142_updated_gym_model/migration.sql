/*
  Warnings:

  - Added the required column `gymId` to the `UserMembership` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserMembership" ADD COLUMN     "gymId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "UserMembership" ADD CONSTRAINT "UserMembership_gymId_fkey" FOREIGN KEY ("gymId") REFERENCES "Gym"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
