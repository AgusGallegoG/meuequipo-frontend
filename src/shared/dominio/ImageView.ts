import z from 'zod';

export type ImageView = {
  id: number;
  name: string;
  url: string;
};

export const imageViewSchema = z.object({
  id: z.number(),
  name: z.string(),
  url: z.string(),
}) satisfies z.ZodType<ImageView>;
