export interface LoginRequest {
  email: string;
  password: string;
}

export const defaultLoginRequest: LoginRequest = {
  email: '',
  password: '',
};
