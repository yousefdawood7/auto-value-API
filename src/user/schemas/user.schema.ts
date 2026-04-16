import z from 'zod';

export const userSchema = z.object({
  firstName: z
    .string({ error: 'First name is required' })
    .min(3, 'First name must be at least 3 characters long')
    .max(255, 'First name must not exceed 255 characters'),

  lastName: z
    .string({ error: 'Last name is required' })
    .min(3, 'Last name must be at least 3 characters long')
    .max(255, 'Last name must not exceed 255 characters'),

  password: z
    .union([z.string(), z.number()])
    .refine((val) => val.toString().length >= 10, {
      error: 'Password must be at least 10 characters long',
    }),
});
