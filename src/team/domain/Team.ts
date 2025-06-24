import { imageViewSchema, type ImageView } from '@/shared/dominio/ImageView';
import z from 'zod';

export type Team = {
  id: number;
  name: string;
  category: number | null;
  sex: number | null;
  trainer: string;
  teamImage: ImageView | null;
};

export type TeamForm = Team & {
  trainerContact: string;
  players: number[];
};

export const defaultTeamForm: TeamForm = {
  id: -1,
  category: null,
  sex: null,
  name: '',
  players: [],
  teamImage: null,
  trainer: '',
  trainerContact: '',
};

export const teamFormSchema = z.object({
  id: z.number(),
  name: z.string().min(1, { message: 'signinvalidation.name_required' }),
  category: z
    .number()
    .nonnegative({ message: 'playervalidation.category_required' })
    .nullable()
    .refine(
      (data) => {
        return data !== null;
      },
      { message: 'playervalidation.category_required' }
    ),
  sex: z
    .number()
    .nonnegative({ message: 'playervalidation.sex_required' })
    .nullable()
    .refine(
      (data) => {
        return data !== null;
      },
      { message: 'playervalidation.sex_required' }
    ),
  trainer: z.string().min(1, { message: 'teamvalidation.trainer_required' }),
  teamImage: imageViewSchema.nullable(),
  trainerContact: z.string(),
  players: z.array(z.number()),
}) satisfies z.ZodType<TeamForm>;
