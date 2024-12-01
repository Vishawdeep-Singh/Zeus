'use server';

import prisma from '@repo/db/client';

export const verifyOtp = async (otp: string, email: string) => {
  try {
    const response = await prisma.oTP.findFirst({
      where: {
        email,
      },
    });
    if (!response) {
      return { error: 'OTP Does not exists for this email' };
    }
    if (response.otp !== otp) {
      return { error: 'Invalid OTP' };
    }
    if (response.expiresAt < new Date()) {
      return { error: 'OTP expired' };
    }
    return { isVerified: true };
  } catch (error) {
    console.error(error);
    return { error: 'Not able to process verify otp for a moment' };
  }
};
