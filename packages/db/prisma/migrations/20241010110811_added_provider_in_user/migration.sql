/*
  Warnings:

  - Added the required column `provider` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Providers" AS ENUM ('google', 'credentials');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "provider" "Providers" NOT NULL;
