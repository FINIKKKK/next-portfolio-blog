import { AxiosInstance } from "axios";
import { TUser, UserDto } from "./types";

export const UserApi = (instance: AxiosInstance) => ({
  async register(dto: UserDto) {
    const { data } = await instance.post<UserDto, { data: TUser }>(
      "/auth/register",
      dto
    );
    return data;
  },
});
