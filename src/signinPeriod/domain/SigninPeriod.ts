import { z } from 'zod';

export type SigninPeriod = {
  id: number;
  dateInit: Date | null;
  dateEnd: Date | null;
};

export const defaultSigninPeriod: SigninPeriod = {
  id: -1,
  dateInit: null,
  dateEnd: null,
};

export const signinPeriodSchema = z
  .object({
    id: z.number(),
    dateInit: z
      .date()
      .nullable()
      .refine((v) => v !== null, { message: 'periodvalidation.datestart_required' }),
    dateEnd: z
      .date()
      .nullable()
      .refine((v) => v !== null, { message: 'periodvalidation.dateend_required' }),
  })
  .refine(
    (data) => {
      if (data.dateInit === null || data.dateEnd === null) return true;
      return data.dateEnd > data.dateInit;
    },
    { path: ['dateEnd'], message: 'periodvalidation.end_date_later' }
  ) satisfies z.ZodType<SigninPeriod>;
