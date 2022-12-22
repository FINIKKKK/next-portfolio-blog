import { AxiosInstance } from "axios";
import { HomePageProps } from "../../pages";
import { CreatePostDto, PostsParams, TPost } from "./types";

export const PostApi = (instance: AxiosInstance) => ({
  async getAll(dto: PostsParams) {
    const { data } = await instance.get<PostsParams, { data: HomePageProps }>(
      `/posts?limit=${dto.limit}&page=${dto.page}`
    );
    return data;
  },
  async getOne(id: number) {
    const { data } = await instance.get<TPost>(`/posts/${id}`);
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
