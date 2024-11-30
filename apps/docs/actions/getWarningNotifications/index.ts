'use server';

import { authOptions } from '@/lib/auth';
import prisma from '@repo/db/client';
import { error } from 'console';
import { getServerSession } from 'next-auth';

export const getwarningNotifications = async () => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user.id) {
      return { error: 'Not authorized' };
    }
    const response = await prisma.warningNotifications.findMany({
      where: {
        userId: Number(session.user.id),
        resolved: false,
      },
    });
    return { data: response };
  } catch (error) {
    console.error(error);
    return { error: 'Cannot get warning Notfications at the moment' };
  }
};
