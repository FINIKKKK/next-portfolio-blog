import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '../../utils/api/types';
import { TUserDataSlice } from './types';

const initialState: TUserDataSlice = {
  data: null,
};

const userDataSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData(state, { payload }: PayloadAction<TUser>) {
      state.data = payload;
    },
  },
});

export const { setUserData } = userDataSlice.actions;

export default userDataSlice.reducer;