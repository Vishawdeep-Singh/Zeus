'use server';

import { authOptions } from '@/lib/auth';
import prisma from '@repo/db/client';
import { error } from 'console';
import { getServerSession } from 'next-auth';

export async function markAttendance(gymId: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return { error: 'Not authorized' };
    }
    const response = await prisma.attendance.create({
      data: {
        userId: Number(session.user.id),
        gymId: gymId,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
      },
    });
    return { data: response };
  } catch (error) {
    console.error(error);
    return { error: 'Cannot mark the attendace at the moment' };
  }
}
