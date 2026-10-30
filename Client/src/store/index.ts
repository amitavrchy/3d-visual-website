import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/authSlice";
import sceneUiReducer from "@/features/sceneUi/sceneUiSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      sceneUi: sceneUiReducer,
      auth: authReducer,
    },
    devTools: process.env.NODE_ENV === "development",
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
