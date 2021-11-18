import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "../reducers/userReducer";

const rootReducer = combineReducers({
  userReducer,
});

const setupStore = () =>
  configureStore({
    reducer: rootReducer,
  });

export default setupStore;
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
