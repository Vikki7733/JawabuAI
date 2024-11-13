// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import courseReducer from "./slices/courseSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: courseReducer
  },
});

export type RootState = ReturnType<typeof store.getState>; // Define RootState type
export type AppDispatch = typeof store.dispatch;
