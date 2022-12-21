import { AxiosInstance } from "axios";
import { CreateCommentDto, TComment } from "./types";

export const CommentApi = (instance: AxiosInstance) => ({
  async getAll(postId: number) {
    const { data } = await instance.get<TComment[]>(`/comments?postId=${postId}`);
    return data;
  },
  async create(dto: CreateCommentDto) {
    const { data } = await instance.post<CreateCommentDto, { data: TComment }>(
      "/comments",
      dto
    );
    return data;
  },
});
