import { createSlice } from "@reduxjs/toolkit";
import { IUserState } from "../../types/storyTypes";
import { getCurrentUser } from "../../services/auth.service";

const currentUser = () => {
  if (getCurrentUser()) {
    return true;
  }

  return false;
};

export const initialState: IUserState = {
  user: currentUser(),
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signIn(state, action) {
      state.user = true;
      state.signIn = action.payload;
    },
    signOut(state, action) {
      state.user = false;
      state.signOut = action.payload;
    },
  },
});

export default userSlice.reducer;
