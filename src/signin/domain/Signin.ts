import { defaultPlayer, playerSchema, type Player } from '@/shared/dominio/Player';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { z } from 'zod';

export type Signin = {
  id: number;
  parentName: string;
  parentSurnames: string;
  mail: string;
  phone: string;
  state: number;
  player: Player;
};

export const defaultSignin: Signin = {
  id: -1,
  mail: '',
  parentName: '',
  parentSurnames: '',
  phone: '',
  state: -1,
  player: { ...defaultPlayer },
};

export const signinPublicSchema = z.object({
  id: z.number(),
  parentName: z.string().min(1, { message: 'signinvalidation.name_required' }),
  parentSurnames: z.string().min(1, { message: 'signinvalidation.surnames_required' }),
  mail: z
    .string()
    .min(1, { message: 'signinvalidation.email_required' })
    .email({ message: 'signinvalidation.email_invalid' }),
  phone: z
    .string()
    .min(1, { message: 'signinvalidation.phone_required' })
    .refine((val) => isValidPhoneNumber(val), { message: 'signinvalidation.phone_invalid' }),
  state: z.number(),
  player: playerSchema,
}) satisfies z.ZodType<Signin>;
