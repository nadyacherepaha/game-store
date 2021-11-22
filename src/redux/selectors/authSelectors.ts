import { RootState } from "../store/store";

function getUser(state: RootState) {
  return state.user;
}

export default getUser;
