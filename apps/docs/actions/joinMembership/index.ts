'use server';

import { authOptions } from '@/lib/auth';
import prisma from '@/lib/db';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';

export async function joinMembership(membershipId: string, gymId: string) {
  const session = await getServerSession(authOptions);

  try {
    const activeMembership = await prisma.userMembership.findFirst({
      where: {
        userId: Number(session?.user.id),
        gymId,
        expired: false,
      },
    });

    if (activeMembership) {
      return { error: 'You already have an active membership at this gym' };
    }
    const activeWarningAboutThisGym =
      await prisma.warningNotifications.findMany({
        where: {
          userId: Number(session?.user.id),
          gymId,
          resolved: false,
        },
        select: {
          id: true,
        },
      });

    const [deleteResult, membership, gym] = await prisma.$transaction([
      prisma.userMembership.deleteMany({
        where: {
          userId: Number(session?.user.id),
          gymId,
          expired: true,
        },
      }),
      prisma.userMembership.upsert({
        where: {
          userId_membershipId: {
            userId: Number(session?.user.id),
            membershipId,
          },
        },
        update: {
          expired: false,
          dateJoined: new Date(),
        },
        create: {
          userId: Number(session?.user.id),
          membershipId,
          gymId,
          dateJoined: new Date(),
          expired: false,
        },
      }),
      prisma.gym.update({
        where: { id: gymId },
        data: {
          members: {
            connect: { id: Number(session?.user.id) },
          },
        },
        select: {
          name: true,
          ownerId: true,
        },
      }),
    ]);
    if (activeWarningAboutThisGym.length > 0) {
      try {
        await Promise.all(
          activeWarningAboutThisGym.map((warningNotificationsData) => {
            return prisma.warningNotifications.update({
              where: {
                id: warningNotificationsData.id,
              },
              data: {
                resolved: true,
              },
            });
          })
        );
      } catch (error) {
        console.error('Failed to resolve some warnings:', error);
      }
    }
    revalidatePath(`/user/view/${gymId}`);
    revalidatePath(`/user/memberships`);
    return {
      data: membership,
      gymDetails: gym,
      warningNotifications: activeWarningAboutThisGym,
    };
  } catch (error: any) {
    if (error.code === 'P2002') {
      // Prisma unique constraint violation error
      return { error: 'You already have a membership at this gym' };
    }
    console.error(error);
    return { error: 'Not able to process join membership at the moment' };
  }
}
