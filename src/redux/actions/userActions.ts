import { login, logout } from "../../services/auth.service";
import { useAppDispatch } from "../../hooks/redux";
import { userSlice } from "../reducers/userReducer";

const dispatch = useAppDispatch();

export const userSignInAction = (userName: string) => {
  dispatch(userSlice.actions.signIn);
  login(userName);
};

export const userSignOutAction = () => {
  dispatch(userSlice.actions.signOut);
  logout();
};
