/*
  Warnings:

  - You are about to drop the `_User Memberships` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_User Memberships" DROP CONSTRAINT "_User Memberships_A_fkey";

-- DropForeignKey
ALTER TABLE "_User Memberships" DROP CONSTRAINT "_User Memberships_B_fkey";

-- DropTable
DROP TABLE "_User Memberships";

-- CreateTable
CREATE TABLE "UserMembership" (
    "userId" INTEGER NOT NULL,
    "membershipId" TEXT NOT NULL,
    "dateJoined" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserMembership_pkey" PRIMARY KEY ("userId","membershipId")
);

-- AddForeignKey
ALTER TABLE "UserMembership" ADD CONSTRAINT "UserMembership_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMembership" ADD CONSTRAINT "UserMembership_membershipId_fkey" FOREIGN KEY ("membershipId") REFERENCES "Membership"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
