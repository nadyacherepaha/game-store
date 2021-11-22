import { createSlice } from "@reduxjs/toolkit";
import { deleteUserFromLocalStorage, writeUserToLocalStorage } from "../actions/userActions";

export interface IUserState {
  user: boolean;
}

const initialState: IUserState = {
  user: false,
};

const sliceUser = "user";

export const userSlice = createSlice({
  name: sliceUser,
  initialState,
  reducers: {
    signInUserInLocalStorage(state) {
      state.user = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(writeUserToLocalStorage.fulfilled, (state) => {
      state.user = true;
    });
    builder.addCase(deleteUserFromLocalStorage.fulfilled, (state) => {
      state.user = false;
    });
  },
});

export default userSlice.reducer;
