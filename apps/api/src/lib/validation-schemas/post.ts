import z from 'zod';

export const createPostSchema = z.object(
  {
    text: z
      .string({ message: 'Post text must be a string' })
      .min(1, { message: 'Post text must not be empty string' })
      .max(512, { message: 'Post text must be at most 512 characters long' }),
  },
  { message: 'Invalid input' },
);
