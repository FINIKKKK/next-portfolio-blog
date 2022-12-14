import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { TUser } from "../../utils/api/types";
import { TUserSlice } from "./types";

const initialState: TUserSlice = {
  data: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, { payload }: PayloadAction<TUser>) {
      state.data = payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, { payload }) => {
      state.data = payload;
    },
  },
});

export const userActions = userSlice.actions;
export const { setUser } = userSlice.actions;

export default userSlice.reducer;
