import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { masterTableDataConversion, onwerGymsConversion } from '@/lib/helper';

export async function GET(request: Request) {
  console.log('API /api/getDashboardDataCalled');
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    const response = await prisma.gym.findMany({
      where: {
        ownerId: Number(userId),
      },
      select: {
        id: true,
        name: true,
        members: {
          select: {
            id: true,
            name: true,
            email: true,
            cellPh: true,
            memberships: {
              select: {
                gymId: true,
                membershipId: true,
                dateJoined: true,
                expired: true,
                membership: {
                  select: {
                    duration: true,
                  },
                },
              },
            },
            attendance: true,
          },
        },
      },
    });

    const memberhshipExpiry = response;

    const [structuredData, ownedGyms] = await Promise.all([
      // @ts-ignore
      masterTableDataConversion(response),
      // @ts-ignore
      onwerGymsConversion(response),
    ]);

    return NextResponse.json({
      data: structuredData,
      ownedGyms,
      memberhshipExpiry,
    });
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json(
      { error: 'Not able to get Dashboard Data at the moment' },
      { status: 500 }
    );
  }
}
