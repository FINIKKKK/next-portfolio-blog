import { AxiosInstance } from "axios";
import { CreateCommentDto, TComment, UpdateCommentDto } from "./types";

export const CommentApi = (instance: AxiosInstance) => ({
  async getAll(postId: number) {
    const { data } = await instance.get<TComment[]>(
      `/comments?postId=${postId}`
    );
    return data;
  },
  async create(dto: CreateCommentDto) {
    const { data } = await instance.post<CreateCommentDto, { data: TComment }>(
      "/comments",
      dto
    );
    return data;
  },
  async update(id: number, dto: UpdateCommentDto) {
    const { data } = await instance.patch(`/comments/${id}`, dto);
    return data;
  },
  async remove(id: number) {
    const { data } = await instance.delete(`/comments/${id}`);
    return data;
  },
});
