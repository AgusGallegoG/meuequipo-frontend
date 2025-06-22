import z from 'zod';

export type CategoryTable = {
  content: CategoryItem[];
};

export type CategoryItem = {
  id: number;
  name: string;
  yearInit: Date | null; // permitimos null para el default
  yearEnd: Date | null;
  active: boolean; // con sharedStore tendremos el id de categoryType
};

export const defaultCategoryTable: CategoryTable = {
  content: [],
};

export const defaultCategoryItem: CategoryItem = {
  active: false,
  id: -1,
  name: '',
  yearEnd: null,
  yearInit: null,
};

export const categoryItemSchema = z
  .object({
    id: z.number(),
    active: z.boolean(),
    name: z.string().min(1, { message: 'signinvalidation.name_required' }),
    yearInit: z
      .date({ required_error: 'playervalidation.date_required' })
      .nullable()
      .refine((val) => val !== null, { message: 'playervalidation.date_required' }),
    yearEnd: z.date().nullable(),
  })
  .refine(
    (data) => {
      return data.yearEnd === null || (data.yearInit !== null && data.yearEnd > data.yearInit);
    },
    {
      path: ['yearEnd'],
      message: 'categoryvalidation.end_date_later',
    }
  ) satisfies z.ZodType<CategoryItem>;
