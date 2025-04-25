export interface LoginRequest {
  name: string;
  password: string;
}

export const defaultLoginRequest: LoginRequest = {
  name: '',
  password: '',
};
