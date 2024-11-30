import { z } from 'zod';

export const signUpSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .min(3, { message: 'Must be 3 or more characters long' }),
  cellPh: z
    .string()
    .length(10, { message: 'Phone number should be of 10 digits' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be minimum 6 length' }),
});

export const signInSchema = signUpSchema.pick({
  cellPh: true,
  password: true,
});
