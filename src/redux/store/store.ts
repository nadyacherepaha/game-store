import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "../reducers/userReducer";
import cartSlice from "../reducers/cartReducer";

const reducers = {
  user: userReducer,
  cart: cartSlice.reducer,
};

const rootReducer = combineReducers({
  ...reducers,
});

const setupStore = () =>
  configureStore({
    reducer: rootReducer,
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
export default setupStore;
