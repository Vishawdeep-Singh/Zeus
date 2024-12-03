-- CreateIndex
CREATE INDEX "Attendance_userId_gymId_date_idx" ON "Attendance"("userId", "gymId", "date");

-- CreateIndex
CREATE INDEX "Gym_ownerId_idx" ON "Gym"("ownerId");

-- CreateIndex
CREATE INDEX "Gym_id_idx" ON "Gym"("id");

-- CreateIndex
CREATE INDEX "Gym_ownerId_id_idx" ON "Gym"("ownerId", "id");

-- CreateIndex
CREATE INDEX "Notification_userId_idx" ON "Notification"("userId");

-- CreateIndex
CREATE INDEX "Notification_id_idx" ON "Notification"("id");

-- CreateIndex
CREATE INDEX "User_cellPh_idx" ON "User"("cellPh");

-- CreateIndex
CREATE INDEX "UserMembership_userId_gymId_expired_idx" ON "UserMembership"("userId", "gymId", "expired");

-- CreateIndex
CREATE INDEX "UserMembership_userId_gymId_idx" ON "UserMembership"("userId", "gymId");

-- CreateIndex
CREATE INDEX "UserMembership_gymId_idx" ON "UserMembership"("gymId");

-- CreateIndex
CREATE INDEX "UserMembership_userId_idx" ON "UserMembership"("userId");

-- CreateIndex
CREATE INDEX "WarningNotifications_userId_resolved_idx" ON "WarningNotifications"("userId", "resolved");

-- CreateIndex
CREATE INDEX "WarningNotifications_userId_gymId_resolved_message_idx" ON "WarningNotifications"("userId", "gymId", "resolved", "message");

-- CreateIndex
CREATE INDEX "WarningNotifications_gymId_idx" ON "WarningNotifications"("gymId");

-- CreateIndex
CREATE INDEX "WarningNotifications_id_idx" ON "WarningNotifications"("id");
