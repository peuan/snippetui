import { IKata } from "@/interfaces/IKata"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const kataApi = createApi({
  reducerPath: "kataApi",
  refetchOnFocus: false,
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/",
  }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    checkKata: builder.mutation<IKata, { code: string }>({
      query: ({ code }) => ({
        url: "/kata",
        method: "POST",
        body: JSON.stringify({
          code: code,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),
  }),
})

export const { useCheckKataMutation } = kataApi
