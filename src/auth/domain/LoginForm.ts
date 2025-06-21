import { z } from 'zod';

export type LoginForm = {
  name: string;
  password: string;
};

export const defaultLoginForm: LoginForm = {
  name: '',
  password: '',
};

export const loginFormSchema = z.object({
  name: z.string().min(1, { message: 'loginvalidation.name_mandatory' }),
  password: z.string().min(1, { message: 'loginvalidation.password_required' }),
}) satisfies z.ZodType<LoginForm>;
