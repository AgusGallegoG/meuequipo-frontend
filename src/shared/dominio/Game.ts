import { imageViewSchema, type ImageView } from '@/shared/dominio/ImageView';
import { viewSquadSchema, type ViewSquad } from '@/squad/domain/ViewSquad';
import { z } from 'zod';

export type Game = {
  id: number;
  localTeam: GameTeam | null;
  localPoints: number | null;
  visitorTeam: GameTeam | null;
  visitorPoints: number | null;
  category: number | null;
  location: string;
  gameDate: Date | null;
  state: number | null;
  squad: ViewSquad | null;
};

export type GameTeam = {
  id: number;
  name: string;
  logo: ImageView | null;
  isOurTeam: boolean;
};

export const defaultGameTeam: GameTeam = {
  id: -1,
  logo: null,
  name: '',
  isOurTeam: false,
};

export const defaultGame: Game = {
  id: -1,
  category: null,
  localTeam: null,
  localPoints: null,
  visitorTeam: null,
  visitorPoints: null,
  location: '',
  gameDate: null,
  state: null,
  squad: null,
};

const gameTeamSchema = z.object({
  id: z.number(),
  logo: imageViewSchema.nullable(),
  name: z.string(),
  isOurTeam: z.boolean(),
}) satisfies z.ZodType<GameTeam>;

export const gameSchema = z.object({
  id: z.number(),
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
  localTeam: gameTeamSchema
    .nullable()
    .refine((v) => v !== null, { message: 'gamevalidation.team_required' }),
  localPoints: z.number().nullable(),
  visitorTeam: gameTeamSchema
    .nullable()
    .refine((v) => v !== null, { message: 'gamevalidation.team_required' }),
  visitorPoints: z.number().nullable(),
  location: z.string().min(1, { message: 'gamevalidation.location_required' }),
  gameDate: z
    .date()
    .nullable()
    .refine((v) => v !== null, { message: 'gamevalidation.date_required' }),
  state: z
    .number()
    .nonnegative({ message: 'gamevalidation.state_required' })
    .nullable()
    .refine((v) => v !== null, { message: 'gamevalidation.state_required' }),
  squad: viewSquadSchema.nullable(),
}) satisfies z.ZodType<Game>;
