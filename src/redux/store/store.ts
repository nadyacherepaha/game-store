import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "../reducers/userReducer";
import cartSlice from "../reducers/cartReducer";
import adminSlice from "../reducers/adminReducer";

const reducers = {
  user: userReducer,
  cart: cartSlice.reducer,
  admin: adminSlice.reducer,
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
