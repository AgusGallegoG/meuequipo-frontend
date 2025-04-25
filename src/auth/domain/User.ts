export interface User {
  completeName: string;
  email: string;
  token: string;
  authorities: string[];
}

export const userDefault: User = {
  authorities: [],
  completeName: '',
  token: '',
  email: '',
};
