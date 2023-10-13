import {
  Middleware,
  MiddlewareAPI,
  applyMiddleware,
  configureStore,
  isRejectedWithValue,
} from "@reduxjs/toolkit"
import battleReducer from "@/redux/features/battleSlice"
import showCaseReducer from "@/redux/features/showCaseSlice"
import playgroundReducer from "@/redux/features/playgroundSlice"
import { setToast } from "@/redux/features/toastSlice"
import chatGPTReducer from "@/redux/features/chatGPTSlice"
import toastReducer from "@/redux/features/toastSlice"
import themeReducer from "@/redux/features/themeSlice"
import pageReducer from "@/redux/features/pageSlice"
import loadingReducer from "@/redux/features/loadingSlice"
import leaderboardReducer from "@/redux/features/leaderboardSlice"

import { battleApi } from "@/redux/services/battleApi"
import { showCaseApi } from "@/redux/services/showCaseApi"
import { playgroundApi } from "@/redux/services/playgroundApi"
import { setupListeners } from "@reduxjs/toolkit/dist/query"
import { chatGPTApi } from "@/redux/services/chatGPTApi"
import { kataApi } from "@/redux/services/kataApi"
import { leaderboardApi } from "./services/leaderboardApi"

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    const { dispatch } = api

    if (isRejectedWithValue(action)) {
      if (action.payload.status) {
        dispatch(
          setToast({
            title: action?.payload?.data?.message,
            status: action.payload.status,
          })
        )
      } else {
        dispatch(
          setToast({
            title: "Something Went Wrong, Please Try Again",
            status: 500,
          })
        )
      }
    }

    return next(action)
  }

const middlewareEnhancer = applyMiddleware(rtkQueryErrorLogger)

export const store = configureStore({
  reducer: {
    battleReducer,
    leaderboardReducer,
    showCaseReducer,
    playgroundReducer,
    chatGPTReducer,
    toastReducer,
    themeReducer,
    pageReducer,
    loadingReducer,
    [battleApi.reducerPath]: battleApi.reducer,
    [leaderboardApi.reducerPath]: leaderboardApi.reducer,
    [showCaseApi.reducerPath]: showCaseApi.reducer,
    [playgroundApi.reducerPath]: playgroundApi.reducer,
    [chatGPTApi.reducerPath]: chatGPTApi.reducer,
    [kataApi.reducerPath]: kataApi.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat(
      battleApi.middleware,
      leaderboardApi.middleware,
      showCaseApi.middleware,
      playgroundApi.middleware,
      chatGPTApi.middleware,
      kataApi.middleware
    ),
  enhancers: [middlewareEnhancer],
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
