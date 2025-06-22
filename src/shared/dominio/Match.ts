import { imageViewSchema, type ImageView } from '@/shared/dominio/ImageView';
import { viewSquadSchema, type ViewSquad } from '@/squad/domain/ViewSquad';
import { z } from 'zod';

export type Match = {
  id: number;
  localTeam: MatchTeam | null;
  localPoints: number | null;
  visitorTeam: MatchTeam | null;
  visitorPoints: number | null;
  category: number | null;
  location: string;
  matchDate: Date | null;
  state: number | null;
  squad: ViewSquad | null;
};

export type MatchTeam = {
  id: number;
  name: string;
  logo: ImageView | null;
  isOurTeam: boolean;
};

export const defaultMatchTeam: MatchTeam = {
  id: -1,
  logo: null,
  name: '',
  isOurTeam: false,
};

export const defaultMatch: Match = {
  id: -1,
  category: null,
  localTeam: null,
  localPoints: null,
  visitorTeam: null,
  visitorPoints: null,
  location: '',
  matchDate: null,
  state: null,
  squad: null,
};

const matchTeamSchema = z.object({
  id: z.number(),
  logo: imageViewSchema.nullable(),
  name: z.string(),
  isOurTeam: z.boolean(),
}) satisfies z.ZodType<MatchTeam>;

export const matchSchema = z.object({
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
  localTeam: matchTeamSchema
    .nullable()
    .refine((v) => v !== null, { message: 'matchvalidation.team_required' }),
  localPoints: z.number().nullable(),
  visitorTeam: matchTeamSchema
    .nullable()
    .refine((v) => v !== null, { message: 'matchvalidation.team_required' }),
  visitorPoints: z.number().nullable(),
  location: z.string().min(1, { message: 'matchvalidation.location_required' }),
  matchDate: z
    .date()
    .nullable()
    .refine((v) => v !== null, { message: 'matchvalidation.date_required' }),
  state: z
    .number()
    .nonnegative({ message: 'matchvalidation.state_required' })
    .nullable()
    .refine((v) => v !== null, { message: 'matchvalidation.state_required' }),
  squad: viewSquadSchema.nullable(),
}) satisfies z.ZodType<Match>;
