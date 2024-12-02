'use server';

import { authOptions } from '@/lib/auth';
import prisma from '@/lib/db';
import { getServerSession } from 'next-auth';

export const getOwnerId = async (gymId: string) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user.id) {
      return { error: 'Not authorized' };
    }
    const response = await prisma.gym.findUnique({
      where: {
        id: gymId,
      },
      select: {
        ownerId: true,
      },
    });
    return { data: response };
  } catch (error) {
    console.error(error);
    return { error: 'Not able process GOI request at a time' };
  }
};
