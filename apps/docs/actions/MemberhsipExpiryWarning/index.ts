'use server';
import prisma from '@repo/db/client';
import moment from 'moment';

export const membershipExpiryWarning = async (data: any) => {
  const notifications: any[] = [];

  for (const userMembership of data) {
    console.log('AAABBB', userMembership);

    const originalDate = moment(userMembership.dateJoined);
    const monthsToSubtract = userMembership.membership.duration;
    const addMonths = originalDate.clone().add(monthsToSubtract, 'months');
    const differenceInDays = addMonths.diff(moment(), 'days');

    const checkIfActiveMembershipOfThisGymExists =
      await prisma.userMembership.findFirst({
        where: {
          userId: Number(userMembership.userId),
          gymId: userMembership.gymId,
          expired: false,
        },
      });

    if (checkIfActiveMembershipOfThisGymExists) {
      continue;
    }

    let warningMessage = '';
    if (0 < differenceInDays && differenceInDays <= 5) {
      warningMessage = `Your membership at ${userMembership.gym.name} expiring in ${differenceInDays} days`;
    } else if (differenceInDays <= 0) {
      console.log('Diff', differenceInDays);
      warningMessage = `Your membership at ${userMembership.gym.name} has been expired`;
    }

    const checkIfWarningExists = await prisma.warningNotifications.findFirst({
      where: {
        userId: Number(userMembership.userId),
        gymId: userMembership.gymId,
        resolved: false,
        message: warningMessage,
      },
    });
    let notification;

    if (!checkIfWarningExists) {
      notification = await prisma.warningNotifications.create({
        data: {
          userId: Number(userMembership.userId),
          gymId: userMembership.gymId,
          message: warningMessage,
          resolved: false,
        },
        select: {
          gymId: true,
          id: true,
          userId: true,
          message: true,
          resolved: true,
        },
      });
    } else {
      if (checkIfWarningExists.message !== warningMessage) {
        notification = await prisma.warningNotifications.update({
          where: {
            id: checkIfWarningExists.id,
          },
          data: {
            message: warningMessage,
          },
          select: {
            gymId: true,
            id: true,
            userId: true,
            message: true,
            resolved: true,
          },
        });
      }
    }
    if (notification) {
      notifications.push(notification);
    }
  }
  return notifications;
};
