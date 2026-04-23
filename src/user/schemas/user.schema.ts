import z from 'zod';

export const userSchema = z.object({
  email: z
    .string({ error: 'Email is required' })
    .min(1, { error: 'Email is required' })
    .pipe(z.email({ error: 'Invalid email format' })),

  firstName: z
    .string({ error: 'First name is required' })
    .min(3, 'First name must be at least 3 characters long')
    .max(255, 'First name must not exceed 255 characters'),

  lastName: z
    .string({ error: 'Last name is required' })
    .min(3, 'Last name must be at least 3 characters long')
    .max(255, 'Last name must not exceed 255 characters'),

  password: z
    .union([z.string(), z.number()], {
      error: 'Password must be a string or a number',
    })
    .refine((val) => val.toString().length >= 10, {
      error: 'Password must be at least 10 characters long',
    }),
});
