import { z } from 'zod';

export type Select = {
  id: number;
  name: string;
};

export const selectSchema = z.object({
  id: z.number(),
  name: z.string(),
}) satisfies z.ZodType<Select>;
