import {
  Middleware,
  MiddlewareAPI,
  applyMiddleware,
  configureStore,
  isRejectedWithValue,
} from "@reduxjs/toolkit"
import battleReducer from "./features/battleSlice"
import showCaseReducer from "./features/showCaseSlice"
import playgroundReducer from "./features/playgroundSlice"
import { setToast } from "./features/toastSlice"
import chatGPTReducer from "./features/chatGPTSlice"
import toastReducer from "./features/toastSlice"
import themeReducer from "./features/themeSlice"

import { battleApi } from "@/redux/services/battleApi"
import { showCaseApi } from "@/redux/services/showCaseApi"
import { playgroundApi } from "@/redux/services/playgroundApi"
import { setupListeners } from "@reduxjs/toolkit/dist/query"
import { chatGPTApi } from "@/redux/services/chatGPTApi"

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    const { dispatch } = api

    if (isRejectedWithValue(action)) {
      if (action.payload.status) {
        dispatch(
          setToast({
            title: action.payload.data.message,
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
    showCaseReducer,
    playgroundReducer,
    chatGPTReducer,
    toastReducer,
    themeReducer,
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
  enhancers: [middlewareEnhancer],
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
