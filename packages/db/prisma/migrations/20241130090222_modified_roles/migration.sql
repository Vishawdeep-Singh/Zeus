/*
  Warnings:

  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_User Roles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_User Roles" DROP CONSTRAINT "_User Roles_A_fkey";

-- DropForeignKey
ALTER TABLE "_User Roles" DROP CONSTRAINT "_User Roles_B_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "roles" "Roles" NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE "Role";

-- DropTable
DROP TABLE "_User Roles";
