import z from 'zod';

export const createPostSchema = z.object(
  {
    username: z
      .string({ message: 'Username must be a string' })
      .min(1, { message: 'Username must not be empty string' })
      .max(128, { message: 'Username must be at most 320 characters long' }),
    email: z
      .string({ message: 'Email must be a string' })
      .email({ message: 'Email field must match email format' })
      .min(1, { message: 'Email must not be empty string' })
      .max(320, { message: 'Email must be at most 320 characters long' }),
    text: z
      .string({ message: 'Post text must be a string' })
      .min(1, { message: 'Post text must not be empty string' })
      .max(512, { message: 'Post text must be at most 512 characters long' }),
  },
  { message: 'Invalid input' },
);
