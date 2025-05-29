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
