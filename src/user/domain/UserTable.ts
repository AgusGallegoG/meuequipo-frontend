import { z } from 'zod';

export type UserTable = {
  content: UserItem[];
  totalRecords: number;
};

export type UserItem = {
  id: number;
  name: string;
  surnames: string;
  email: string;
  active: boolean;
};

export const defaultUserTable: UserTable = {
  content: [],
  totalRecords: 0,
};

export const defaultUserItem: UserItem = {
  id: -1,
  active: false,
  name: '',
  email: '',
  surnames: '',
};

export const userItemSchema = z.object({
  id: z.number(),
  name: z.string().min(1, { message: 'signinvalidation.name_required' }),
  surnames: z.string().min(1, { message: 'signinvalidation.surnmaes_required' }),
  email: z
    .string()
    .min(1, { message: 'signinvalidation.email_required' })
    .email({ message: 'signinvalidation.email_invalid' }),
  active: z.boolean(),
}) satisfies z.ZodType<UserItem>;
