export interface LoginResponse {
  completeName: string;
  email: string;
  token: string;
  authorities: string[];
}

export const userDefault: LoginResponse = {
  authorities: [],
  completeName: '',
  email: '',
  token: '',
};
