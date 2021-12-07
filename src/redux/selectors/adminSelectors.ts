import { RootState } from "../store/store";

function getAdmin(state: RootState) {
  return state.admin;
}

export default getAdmin;
