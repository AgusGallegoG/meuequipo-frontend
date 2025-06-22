import { imageViewSchema, type ImageView } from '@/shared/dominio/ImageView';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { z } from 'zod';

export type RivalTable = {
  content: RivalItem[];
  totalRecords: number;
};

export type RivalItem = {
  id: number;
  logo: ImageView | null;
  tlf: string;
  name: string;
  responsible: string;
};

export type Rival = RivalItem & {
  email: string;
  categories: number[];
};

export const defaultRivalTable: RivalTable = {
  content: [],
  totalRecords: 0,
};

export const defaultRival: Rival = {
  id: -1,
  logo: null,
  name: '',
  responsible: '',
  email: '',
  tlf: '',
  categories: [],
};

export const rivalSchema = z.object({
  id: z.number(),
  logo: imageViewSchema.nullable(),
  tlf: z
    .string()
    .min(1, { message: 'signinvalidation.phone_required' })
    .refine((val) => isValidPhoneNumber(val), { message: 'signinvalidation.phone_invalid' }),
  email: z
    .string()
    .min(1, { message: 'signinvalidation.email_required' })
    .email({ message: 'signinvalidation.email_invalid' }),
  name: z.string().min(1, { message: 'signinvalidation.name_required' }),
  categories: z.array(z.number()).min(1, { message: 'playervalidation.category_required' }),
  responsible: z.string(),
}) satisfies z.ZodType<Rival>;
