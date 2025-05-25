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
