-- CreateTable
CREATE TABLE "WarningNotifications" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "gymId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "resolved" BOOLEAN NOT NULL,

    CONSTRAINT "WarningNotifications_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WarningNotifications" ADD CONSTRAINT "WarningNotifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WarningNotifications" ADD CONSTRAINT "WarningNotifications_gymId_fkey" FOREIGN KEY ("gymId") REFERENCES "Gym"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
