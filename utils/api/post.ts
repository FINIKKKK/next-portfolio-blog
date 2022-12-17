import { AxiosInstance } from "axios";
import { CreatePostDto, TPost } from "./types";

export const PostApi = (instance: AxiosInstance) => ({
  async getAll() {
    const { data } = await instance.get<TPost[]>("/posts");
    return data;
  },
  async create(dto: CreatePostDto) {
    const { data } = await instance.post<CreatePostDto, { data: TPost }>(
      "/posts",
      dto
    );
    return data;
  },
});
