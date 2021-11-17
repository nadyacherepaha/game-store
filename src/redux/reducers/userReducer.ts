import { UserAction, IUserState, UserActionTypes } from "../../types/storyTypes";

const initialState: IUserState = {
  user: null,
};

const userReducer = (state = initialState, action: UserAction): IUserState => {
  switch (action.type) {
    case UserActionTypes.USER_LOGIN:
      return { user: true };
    case UserActionTypes.USER_LOGOUT:
      return { user: false };
    default:
      return state;
  }
};

export default userReducer;
