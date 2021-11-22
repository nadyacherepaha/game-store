import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, logout } from "../../services/auth.service";

const UserActions = {
  WRITE_USER_TO_STORE: "user/writeUserToStore",
  DELETE_USER_FROM_STORE: "user/deleteUserFromStore",
};

export const writeUserToLocalStorage = createAsyncThunk(UserActions.WRITE_USER_TO_STORE, (userName: string) => {
  login(userName);
});

export const deleteUserFromLocalStorage = createAsyncThunk(UserActions.DELETE_USER_FROM_STORE, () => {
  logout();
});
