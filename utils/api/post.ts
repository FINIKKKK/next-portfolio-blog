import { AxiosInstance } from "axios";
import { HomePageProps } from "../../pages";
import { CreatePostDto, CreateTagDto, PostsParams, TPost, UpdatePostDto } from "./types";

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
  async update(id: number, dto: UpdatePostDto) {
    const { data } = await instance.patch<UpdatePostDto, { data: TPost }>(
      `/posts/${id}`,
      dto
    );
    return data;
  },
  async remove(id: number) {
    const { data } = await instance.delete<TPost>(`/posts/${id}`);
    return data;
  },
});
