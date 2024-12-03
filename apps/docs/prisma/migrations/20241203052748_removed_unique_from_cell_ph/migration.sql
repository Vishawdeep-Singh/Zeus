-- DropIndex
DROP INDEX "User_cellPh_key";

-- AlterTable
ALTER TABLE "_Gym member" ADD CONSTRAINT "_Gym member_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_Gym member_AB_unique";
