import z from 'zod';

export const userSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(255, 'First name must not exceed 255 characters'),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .max(255, 'Last name must not exceed 255 characters'),
  password: z
    .union([z.string(), z.number()])
    .refine((val) => val.toString().length >= 8, {
      error: 'Password must be at least 10 characters long',
    }),
});
