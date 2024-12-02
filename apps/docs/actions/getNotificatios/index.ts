'use server';

import { authOptions } from '@/lib/auth';
import prisma from '@/lib/db';
import { getServerSession } from 'next-auth';

export async function getNotifications() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user.id) {
      return { error: 'Not Authorized' };
    }
    const response = await prisma.notification.findMany({
      where: {
        userId: Number(session?.user.id),
      },
    });
    return { data: response };
  } catch (error) {
    console.error(error);
    return { error: 'Cant getNotifications at the moment' };
  }
}
