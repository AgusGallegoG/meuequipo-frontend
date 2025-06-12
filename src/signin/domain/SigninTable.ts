export type SigninTable = {
  content: SigninItem[];
  totalRecords: number;
};

export type SigninItem = {
  id: number;
  playerCompleteName: string;
  sex: number;
  category: number;
  state: number;

  // subrow/expansion
  parentCompleteName: string;
  email: string;
  phone: string;
};

export const defaultSigninTable: SigninTable = {
  content: [],
  totalRecords: 0,
};
