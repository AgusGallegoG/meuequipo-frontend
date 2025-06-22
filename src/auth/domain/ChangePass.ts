import { z } from 'zod';

const passwordRegex = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{8,})\S$/;

export type ChangePass = {
  oldPass: string;
  newPass: string;
  confirmNewPass: string;
};

export const defaultChangePass = {
  oldPass: '',
  newPass: '',
  confirmNewPass: '',
};

export const changePassSchema = z
  .object({
    oldPass: z.string().min(1, { message: 'changepassvalidation.old_required' }),
    newPass: z
      .string()
      .min(8, { message: 'changepassvalidation.min_length' })
      .regex(passwordRegex, { message: 'changepassvalidation.format' }),
    confirmNewPass: z.string().min(1, { message: 'changepassvalidation.confirm_required' }),
  })
  .refine(
    (data) => {
      return data.newPass === data.oldPass;
    },
    {
      path: ['confirmNewPass'],
      message: 'changepassvalidation.pass_missmatch',
    }
  ) satisfies z.ZodType<ChangePass>;
