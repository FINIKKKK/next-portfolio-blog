import { AxiosInstance } from "axios";
import { TUser, UserLoginDto, UserRegisterDto } from "./types";

export const UserApi = (instance: AxiosInstance) => ({
  async register(dto: UserRegisterDto) {
    const { data } = await instance.post<UserRegisterDto, { data: TUser }>(
      "/auth/register",
      dto
    );
    return data;
  },
  async login(dto: UserLoginDto) {
    const { data } = await instance.post<UserLoginDto, { data: TUser }>(
      "/auth/login",
      dto
    );
    return data;
  },
});
