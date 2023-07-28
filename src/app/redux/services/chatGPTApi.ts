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
    postMessage: builder.query<IChatGPT, { message: string; apiKey: string }>({
      query: (message) => ({
        url: "/chatgpt",
        method: "POST",
        body: JSON.stringify({
          message: message.message,
          apikey: message.apiKey,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),
  }),
})

export const { usePostMessageQuery } = chatGPTApi
