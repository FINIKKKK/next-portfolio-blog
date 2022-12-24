import { AxiosInstance } from "axios";
import { CreateTagDto, TTag } from "./types";

export const TagApi = (instance: AxiosInstance) => ({
  async getAll() {
    const { data } = await instance.get<TTag[]>("/tags");
    return data;
  },
  async create(dto: CreateTagDto) {
    const { data } = await instance.post<CreateTagDto, { data: TTag[] }>(
      "/tags",
      dto
    );
    return data;
  },
});
