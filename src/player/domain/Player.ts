import { z } from 'zod';

export type Player = {
  id: number;
  name: string;
  surnames: string;
  birthDate: Date | null;
  sex: number;
  category: number;
};

export const defaultPlayer: Player = {
  id: -1,
  name: '',
  surnames: '',
  birthDate: null,
  category: -1,
  sex: -1,
};

export const playerSchema = z.object({
  id: z.number(),
  name: z.string().min(1, { message: 'playervalidation.name_required' }),
  surnames: z.string().min(1, { message: 'playervalidation.surnames_required' }),
  birthDate: z
    .date({ required_error: 'playervalidation.date_required' })
    .nullable()
    .refine((val) => val !== null, { message: 'playervalidation.date_required' }),
  sex: z.number().nonnegative({ message: 'playervalidation.sex_required' }),
  category: z.number().nonnegative({ message: 'playervalidation.category_required' }),
}) satisfies z.ZodType<Player>;
