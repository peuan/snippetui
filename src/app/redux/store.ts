import { configureStore } from "@reduxjs/toolkit";
import battleReducer from "./features/battleSlice";
import showCaseReducer from "./features/showCaseSlice";
import playgroundReducer from "./features/playgroundSlice";
import chatGPTReducer from "./features/chatGPTSlice";
import { battleApi } from "@/redux/services/battleApi";
import { showCaseApi } from "@/redux/services/showCaseApi";
import { playgroundApi } from "@/redux/services/playgroundApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { chatGPTApi } from "@/redux/services/chatGPTApi";

export const store = configureStore({
  reducer: {
    battleReducer,
    showCaseReducer,
    playgroundReducer,
    chatGPTReducer,
    [battleApi.reducerPath]: battleApi.reducer,
    [showCaseApi.reducerPath]: showCaseApi.reducer,
    [playgroundApi.reducerPath]: playgroundApi.reducer,
    [chatGPTApi.reducerPath]: chatGPTApi.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat(
      battleApi.middleware,
      showCaseApi.middleware,
      playgroundApi.middleware,
      chatGPTApi.middleware
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
