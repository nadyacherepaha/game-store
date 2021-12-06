import { RootState } from "../store/store";

function getQuantity(state: RootState) {
  return state.cart;
}

export default getQuantity;
