import { authOptions } from '@/lib/auth';
import prisma from '@repo/db/client';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const gymId = searchParams.get('gymId');

    // Get the user's session
    const session = await getServerSession(authOptions);
    if (!session || !session.user.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 } // Unauthorized
      );
    }

    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    console.log(date, time);

    // Fetch attendance records
    const response = await prisma.attendance.findMany({
      where: {
        userId: Number(session.user.id),
        gymId: gymId as string,
        date: date,
      },
    });

    // Return the attendance records
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching attendance:', error);

    // Return a 500 Internal Server Error with a message
    return NextResponse.json(
      { error: 'An error occurred while fetching attendance.' },
      { status: 500 }
    );
  }
}
