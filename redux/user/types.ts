import { TUser } from "../../utils/api/types";

// export interface TUserSlice {
//   data: {
//     user: {
//       data: TUser;
//     };
//   } | null;
// }
export interface TUserSlice {
  data: TUser | null;
}
