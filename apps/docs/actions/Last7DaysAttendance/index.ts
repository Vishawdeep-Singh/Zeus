'use server';

import { authOptions } from '@/lib/auth';
import prisma from '@/lib/db';
import { getServerSession } from 'next-auth';

export const getLastSevenDaysAttendance = async () => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user.id) {
      return { error: 'Not Authorized' };
    }
    const response = await prisma.gym.findMany({
      where: {
        ownerId: Number(session.user.id),
      },
      select: {
        id: true,
        attendance: {
          include: {
            users: {
              select: {
                id: true,
                name: true,
                provider: true,
                image: true,
              },
            },
          },
        },
      },
    });
    return { data: response };
  } catch (error: any) {
    console.error(error.message);
    return { error: 'Not able to get 7 days attendance at the moment' };
  }
};
