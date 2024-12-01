'use server';

import { authOptions } from '@/lib/auth';
import prisma from '@repo/db/client';
import { getServerSession } from 'next-auth';

export const getTodayAttendance = async () => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user.id) {
      return { error: 'Not Authorized' };
    }
    const response = await prisma.gym.findMany({
      where: {
        ownerId: Number(session?.user.id),
      },
      select: {
        id: true,
        attendance: {
          select: {
            date: true,
            time: true,
            userId: true,
            users: {
              select: {
                name: true,
                provider:true,
                image:true
              },
            },
          },
        },
      },
    });
    return { data: response };
  } catch (error) {
    console.error(error);
    return { error: "Cannot Get Today's Attendance at the moment" };
  }
};
