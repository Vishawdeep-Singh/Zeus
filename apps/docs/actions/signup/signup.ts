'use server';

import { SignUp } from '@/types/types';
import prisma from '@/lib/db';
import bcrypt from 'bcrypt';
import { signUpSchema } from '@/types/validations';

export const signup = async (formData: SignUp) => {
  try {
    const result = signUpSchema.safeParse(formData);
    if (!result.success) {
      return {
        errors: result.error.flatten().fieldErrors,
      };
    }
    const hashedPassword = await bcrypt.hash(formData.password as string, 10);
    const isExists = await prisma.user.findFirst({
      where: {
        email: formData.email,
        cellPh: String(formData.cellPh),
      },
    });
    if (isExists) {
      return {
        error: 'User Already Exists',
      };
    }
    const response = await prisma.user.create({
      data: {
        name: formData.name,
        email: formData.email,
        cellPh: formData.cellPh,
        password: hashedPassword,
        provider: 'credentials',
      },
    });
    return { data: response };
  } catch (error: any) {
    console.error(error.message);
    return { error: 'Failed To Process The Request for signUp' };
  }
};
