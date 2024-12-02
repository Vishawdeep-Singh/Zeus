/*
  Warnings:

  - Added the required column `time` to the `Attendance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Attendance" ADD COLUMN     "time" TEXT NOT NULL,
ALTER COLUMN "date" DROP DEFAULT,
ALTER COLUMN "date" SET DATA TYPE TEXT;

-- CreateIndex
CREATE INDEX "Attendance_time_idx" ON "Attendance"("time");
