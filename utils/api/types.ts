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
  body: OutputBlockData[];
  category: TCategory;
  views: number;
  createdAt: string;
  updateAt: string;
  user: TUser;
};

export type CreatePostDto = {
  title: string;
  body: OutputBlockData[];
};

export type CreateCommentDto = {
  text: string;
  postId: number;
};

export type TComment = {
  id: number;
  text: string;
  user: TUser;
  post: TPost;
  createdAt: string;
  updatedAt: string;
};

export type TCategory = {
  id: number;
  name: string;
};


export type UpdateCommentDto = {
  text: string;
};

export type PostsParams = {
  limit: number;
  page: number;
};