import { imageViewSchema, type ImageView } from '@/shared/dominio/ImageView';
import z from 'zod';

export type PublicationNews = {
  content: Publication[];
  totalRecords: number;
};

export type Publication = {
  id: number;
  title: string;
  body: string;
  creationDate: string;
  images: ImageView[] | null;
};

export const defaultPublicationNews: PublicationNews = {
  content: [],
  totalRecords: 0,
};

export const defaultPublication: Publication = {
  body: '',
  title: '',
  creationDate: '',
  images: null,
  id: -1,
};

export const publicationSchema = z.object({
  id: z.number(),
  title: z.string().min(1, { message: 'publicationvalidation.title_required' }),
  body: z.string().min(1, { message: 'publicationvalidation.body_required' }),
  creationDate: z.string(),
  images: z.array(imageViewSchema).nullable(),
}) satisfies z.ZodType<Publication>;
