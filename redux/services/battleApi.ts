import { IBattleResult } from "@/interfaces/IBattle"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const battleApi = createApi({
  reducerPath: "battleApi",
  refetchOnFocus: false,
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/",
  }),
  endpoints: (builder) => ({
    getBattles: builder.query<IBattleResult, { pageNumber: number }>({
      query: ({ pageNumber }) => `battle/${pageNumber}`,
    }),
    getBattleById: builder.query<{ file: string }, { pageNumber: number }>({
      query: ({ pageNumber }) => `battle/${pageNumber}`,
    }),
  }),
})

export const { useGetBattlesQuery, useGetBattleByIdQuery } = battleApi
