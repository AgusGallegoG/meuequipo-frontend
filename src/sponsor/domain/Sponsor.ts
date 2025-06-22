import { imageViewSchema, type ImageView } from '@/shared/dominio/ImageView';
import z from 'zod';

export type Sponsor = {
  id: number;
  logo: ImageView | null;
  name: string;
  url: string;
};

export const defaultSponsor: Sponsor = {
  id: -1,
  logo: null,
  name: '',
  url: '',
};

export const sponsorSchema = z.object({
  id: z.number(),
  logo: imageViewSchema.nullable(),
  name: z.string().min(1, { message: 'playervalidation.name_required' }),
  url: z.string().refine((val) => val === '' || z.string().url().safeParse(val).success, {
    message: 'sponsorvalidation.url_invalid',
  }),
});
