// /src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
import { projectsApi } from "../stores/project.api"; // ← features から stores へ

export const store = configureStore({
  reducer: {
    [projectsApi.reducerPath]: projectsApi.reducer,
  },
  middleware: (gDM) => gDM().concat(projectsApi.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;