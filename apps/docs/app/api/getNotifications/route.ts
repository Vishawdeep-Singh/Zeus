import { authOptions } from '@/lib/auth';
import prisma from '@repo/db/client';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Not authorized' }, { status: 401 });
    }

    const notifications = await prisma.notification.findMany({
      where: {
        userId: Number(session.user.id),
      },
    });

    return NextResponse.json({ data: notifications });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Cannot get notifications at the moment' },
      { status: 500 }
    );
  }
}
