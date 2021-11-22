import { createSlice } from "@reduxjs/toolkit";
import { deleteUserFromLocalStorage, writeUserToLocalStorage } from "../actions/userActions";

export const initialState = {
  user: false,
};

const user = "user";

export const userSlice = createSlice({
  name: user,
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
