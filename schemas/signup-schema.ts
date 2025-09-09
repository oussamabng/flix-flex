import { z } from 'zod';

export const signupSchema = z
  .object({
    username: z.string().min(3, 'Username must be at least 3 chars'),
    password: z.string().min(6, 'Password must be at least 6 chars'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type SignupFormValues = z.infer<typeof signupSchema>;
