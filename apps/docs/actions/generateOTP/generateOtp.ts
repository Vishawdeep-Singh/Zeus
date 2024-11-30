'use server';

import prisma from '@repo/db/client';

export async function generateOTP(email: string) {
  try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Set the expiry time to 30 minutes from now
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes in milliseconds

    const response = await prisma.oTP.create({
      data: {
        otp: otp,
        expiresAt: expiresAt,
        email,
      },
      select: {
        otp: true,
        expiresAt: true,
      },
    });

    return { data: response };
  } catch (error) {
    console.error(error);
    return { error: 'Not able to generate otp at the moment' };
  }
  // Generate a random 6-digit OTP
}
