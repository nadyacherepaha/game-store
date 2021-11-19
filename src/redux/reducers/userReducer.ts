import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IUserState } from "../../types/storyTypes";
import { getCurrentUser, login, logout } from "../../services/auth.service";

const currentUser = () => {
  if (getCurrentUser()) {
    return true;
  }

  return false;
};

export const initialState: IUserState = {
  user: currentUser(),
};

export const writeUserToLocalStorage = createAsyncThunk("user/writeUserToStore", (userName: string) => {
  login(userName);
});

export const deleteUserFromLocalStorage = createAsyncThunk("user/deleteUserFromStore", () => {
  logout();
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
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
