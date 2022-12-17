import { OutputBlockData } from "@editorjs/editorjs";

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

export type TPost = {
  id: number;
  title: string;
  description: string;
  body: any[];
  userId: number;
  views: number;
  createdAt: string;
  updateAt: string;
};

export type CreatePostDto = {
  title: string;
  body: OutputBlockData[];
};