export type UserRegisterDto = {
  name: string;
  email: string;
  password: string;
};

export type UserLoginDto = {
  email: string;
  password: string;
};

export type TUser = {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updateAt: string;
  token?: string;
};
