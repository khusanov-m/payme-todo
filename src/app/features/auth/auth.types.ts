export type LoginRequest = {
  email: string;
  password: string;
};
export type LoginResponse = {
  token: string;
  username: string;
  user_id: string;
};
