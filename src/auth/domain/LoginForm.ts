import { z } from 'zod';

export type LoginForm = {
  email: string;
  password: string;
};

export const defaultLoginForm: LoginForm = {
  email: '',
  password: '',
};

export const loginFormSchema = z.object({
  email: z.string().min(1, { message: 'loginvalidation.name_mandatory' }),
  password: z.string().min(1, { message: 'loginvalidation.password_required' }),
}) satisfies z.ZodType<LoginForm>;
