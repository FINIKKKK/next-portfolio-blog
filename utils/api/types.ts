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
  categoryId: number;
};

export type UpdatePostDto = {
  title: string;
  body: OutputBlockData[];
  category: number;
};

export type CreateCommentDto = {
  text: string;
  postId: number;
  parentId?: number;
};

export type TComment = {
  id: number;
  text: string;
  user: TUser;
  post: TPost;
  createdAt: string;
  updatedAt: string;
  parentUser: TUser;
  children: TComment[];
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

export type CreateTagDto = {
  text: string;
};

export type TTag = {
  id: number;
  text: string;
};

export type TPost2 = {
  random2Posts: { id: number; title: string }[];
} & TPost;
