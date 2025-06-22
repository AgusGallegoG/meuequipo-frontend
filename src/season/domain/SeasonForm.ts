import { z } from 'zod';

export type SeasonForm = {
  startDate: Date | null;
  endDate: Date | null;
  active: boolean;
};

export const emptySeasonForm: SeasonForm = {
  active: false,
  endDate: null,
  startDate: null,
};

export const seasonFormSchema = z
  .object({
    active: z.boolean(),
    startDate: z
      .date()
      .nullable()
      .refine((v) => v !== null, { message: 'seasonvalidation.datestart_required' }),
    endDate: z
      .date()
      .nullable()
      .refine((v) => v !== null, { message: 'seasonvalidation.dateend_required' }),
  })
  .refine(
    (data) => {
      if (data.startDate === null || data.endDate === null) return true;
      return data.endDate > data.startDate;
    },
    { path: ['endDate'], message: 'seasonvalidation.end_date_later' }
  ) satisfies z.ZodType<SeasonForm>;
