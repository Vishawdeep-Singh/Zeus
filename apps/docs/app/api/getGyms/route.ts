import prisma from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req:Request) {
  console.log('API /api/getGyms called');

  try {
    const response = await prisma.gym.findMany({});

    return NextResponse.json({
      data: response,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: 'Not able to Process at moment' },
      { status: 500 }
    );
  }
}
