'use server';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/db';
import { getServerSession } from 'next-auth';

export const handleAccessingAdminTools = async () => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return { error: 'Not Authorized' };
    }
    const response = await prisma.user.update({
      where: {
        id: Number(session.user.id),
      },
      data: {
        roles: 'ADMIN',
      },
    });
    session.user.role = 'ADMIN';
    return { data: response };
  } catch (error: any) {
    console.error(error);
    return { error: 'Not able to access Admin Tools' };
  }
};
