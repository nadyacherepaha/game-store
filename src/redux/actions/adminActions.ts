import { createAsyncThunk } from "@reduxjs/toolkit";
import { adminLogin, adminLogout } from "../../services/auth.service";

const AdminActions = {
  WRITE_ADMIN_TO_STORE: "user/writeAdminToStore",
  DELETE_ADMIN_FROM_STORE: "user/deleteAdminFromStore",
};

export const writeAdminToLocalStorage = createAsyncThunk(AdminActions.WRITE_ADMIN_TO_STORE, (isAdmin: string) => {
  adminLogin(isAdmin);
});

export const deleteAdminFromLocalStorage = createAsyncThunk(AdminActions.DELETE_ADMIN_FROM_STORE, () => {
  adminLogout();
});
