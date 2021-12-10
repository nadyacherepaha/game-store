import { createSlice } from "@reduxjs/toolkit";
import { writeAdminToLocalStorage, deleteAdminFromLocalStorage } from "../actions/adminActions";

export interface IAdminState {
  roleAdmin: boolean;
}

const initialState: IAdminState = {
  roleAdmin: false,
};

const sliceAdmin = "admin";

const adminSlice = createSlice({
  name: sliceAdmin,
  initialState,
  reducers: {
    signInAdminInLocalStorage(state) {
      state.roleAdmin = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(writeAdminToLocalStorage.fulfilled, (state) => {
      state.roleAdmin = true;
    });
    builder.addCase(deleteAdminFromLocalStorage.fulfilled, (state) => {
      state.roleAdmin = false;
    });
  },
});

export default adminSlice;
