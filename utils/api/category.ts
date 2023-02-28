import { AxiosInstance } from "axios";
import { CreatePostDto, TCategory, TPost } from "./types";

export const CategoryApi = (instance: AxiosInstance) => ({
  async getAll() {
    const { data } = await instance.get<TCategory[]>("/categories");
    return data;
  },
});