'use server';

import { authOptions } from '@/lib/auth';
import prisma from '@repo/db/client';
import { getServerSession } from 'next-auth';

export const addNotifications = async (
  message: string,
  time: Date,
  personId: number
) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user.id) {
      return { error: 'Not Authorized' };
    }

    const response = await prisma.notification.create({
      data: {
        userId: Number(personId),
        message,
        createdAt: time,
        type: 'ADMIN',
      },
    });

    return { data: response };
  } catch (error) {
    console.error(error);
    return { error: 'Cannot process notifications at the moment' };
  }
};
