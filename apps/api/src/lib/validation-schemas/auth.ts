import z from 'zod';

export const loginSchema = z.object({
  email: z
    .string({ message: 'Email must be a string' })
    .email({ message: 'Email field must match email format' })
    .min(1, { message: 'Email must not be empty string' })
    .max(320, { message: 'Email must be at most 320 characters long' }),
  password: z
    .string({ message: 'Password must be a string' })
    .min(1, { message: 'Password must not be empty string' })
    .max(32, { message: 'Password must be at most 32 characters long' }),
});

export const signUpSchema = z.object({
  username: z
    .string({ message: 'Username must be a string' })
    .min(1, { message: 'Username must not be empty string' })
    .max(128, { message: 'Username must be at most 320 characters long' }),
  email: z
    .string({ message: 'Email must be a string' })
    .email({ message: 'Email field must match email format' })
    .min(1, { message: 'Email must not be empty string' })
    .max(320, { message: 'Email must be at most 320 characters long' }),
  password: z
    .string({ message: 'Password must be a string' })
    .min(1, { message: 'Password must not be empty string' })
    .max(32, { message: 'Password must be at most 32 characters long' }),
});
