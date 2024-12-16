'use server';

import { authOptions } from '@/lib/auth';
import prisma from '@/lib/db';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';

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
    revalidatePath(`/admin/dashboard`)
    return { data: response };
  } catch (error) {
    console.error(error);
    return { error: 'Cannot mark the attendace at the moment' };
  }
}
