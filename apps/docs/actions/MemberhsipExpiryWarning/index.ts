"use server";
import prisma from "@repo/db/client";
import moment from "moment";

export const membershipExpiryWarning = async (data: any) => {
  for (const userMembership of data) {
    console.log("AAABBB", userMembership);
    const originalDate = moment(userMembership.dateJoined);
    const monthsToSubtract = userMembership.membership.duration;
    const addMonths = originalDate.clone().add(monthsToSubtract, "months");

    const differenceInDays = addMonths.diff(moment(), "days");
    const checkIfActiveMembershipOfThisGymExists = await prisma.userMembership.findFirst({
      where:{
        userId:Number(userMembership.userId),
        gymId:userMembership.gymId,
        expired:false
      }
    })
    if(checkIfActiveMembershipOfThisGymExists){
      return
    }
    if (0 < differenceInDays && differenceInDays <= 5) {
      const warningMessage = `Your membership at ${userMembership.gym.name} expiring in ${differenceInDays} days`;

      const checkIfWarningExists = await prisma.warningNotifications.findFirst({
        where: {
          userId: Number(userMembership.userId),
          gymId: userMembership.gymId,
          resolved: false,
        },
      });
      if (!checkIfWarningExists) {
        await prisma.warningNotifications.create({
          data: {
            userId: Number(userMembership.userId),
            gymId: userMembership.gymId,
            message: warningMessage,
            resolved: false,
          },
        });
      } else {
        if (checkIfWarningExists.message !== warningMessage) {
          await prisma.warningNotifications.update({
            where: {
              id: checkIfWarningExists.id,
            },
            data: {
              message: warningMessage,
            },
          });
        }
      }
    } else if (differenceInDays <= 0) {
      console.log("Diff",differenceInDays)
      const warningMessage = `Your membership at ${userMembership.gym.name} has been expired`;

      const checkIfWarningExists = await prisma.warningNotifications.findFirst({
        where: {
          userId: Number(userMembership.userId),
          gymId: userMembership.gymId,
          resolved: false,
        },
      });
      if (!checkIfWarningExists) {
        await prisma.warningNotifications.create({
          data: {
            userId: Number(userMembership.userId),
            gymId: userMembership.gymId,
            message: warningMessage,
            resolved: false,
          },
        });
      } else {
        if (checkIfWarningExists.message !== warningMessage) {
          await prisma.warningNotifications.update({
            where: {
              id: checkIfWarningExists.id,
            },
            data: {
              message: warningMessage,
            },
          });
        }
      }
    }
  }
};
