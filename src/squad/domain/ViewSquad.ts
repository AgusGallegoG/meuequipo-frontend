import { selectSchema, type Select } from '@/shared/dominio/Select';
import { z } from 'zod';

export type ViewSquad = {
  id: number;
  date: Date;
  location: string;
  players: Select[];
};

export const viewSquadSchema = z.object({
  id: z.number(),
  date: z.date(),
  location: z.string(),
  players: z.array(selectSchema),
}) satisfies z.ZodType<ViewSquad>;
