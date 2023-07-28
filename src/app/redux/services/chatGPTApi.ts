import { IBattleResult } from "@/interfaces/IBattle"
import { IChatGPT } from "@/interfaces/IGPT"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const chatGPTApi = createApi({
  reducerPath: "chatGPTApi",
  refetchOnFocus: false,
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/",
  }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    postMessage: builder.mutation<
      IChatGPT,
      { message: string; apiKey: string }
    >({
      query: (body) => ({
        url: "/chatgpt",
        method: "POST",
        body: JSON.stringify({
          message: body.message,
          apikey: body.apiKey,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),
  }),
})

export const { usePostMessageMutation } = chatGPTApi
