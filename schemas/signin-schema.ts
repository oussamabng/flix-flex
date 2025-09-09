import { z } from 'zod';

export const signinSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type SigninFormValues = z.infer<typeof signinSchema>;
