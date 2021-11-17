export enum UserActionTypes {
  USER_LOGIN = "USER_LOGIN",
  USER_LOGOUT = "USER_LOGOUT",
}

export interface IUserState {
  user: null | boolean;
}

interface IUserLoginAction {
  type: UserActionTypes.USER_LOGIN;
}

interface IUserLogoutAction {
  type: UserActionTypes.USER_LOGOUT;
}

export type UserAction = IUserLoginAction | IUserLogoutAction;
