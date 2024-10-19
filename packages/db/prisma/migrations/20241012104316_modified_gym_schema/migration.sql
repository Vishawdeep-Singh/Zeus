/*
  Warnings:

  - Added the required column `name` to the `Gym` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `Gym` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Gym" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL;
