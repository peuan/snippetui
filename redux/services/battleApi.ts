import { IBattleResult, IFile } from "@/interfaces/IBattle"
import { Sorting } from "@/types/sorting.enum"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const battleApi = createApi({
  reducerPath: "battleApi",
  refetchOnFocus: false,
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/",
  }),
  endpoints: (builder) => ({
    getBattles: builder.query<
      IBattleResult,
      { pageNumber: number; sorting: Sorting; search: string }
    >({
      query: ({ pageNumber, sorting, search }) =>
        `battle/${pageNumber}?sorting=${sorting}&q=${search}`,
    }),
    getBattleById: builder.query<IFile, { folder: string; file: string }>({
      query: ({ folder, file }) => `battle?folder=${folder}&file=${file}`,
    }),
  }),
})

export const { useGetBattlesQuery, useGetBattleByIdQuery } = battleApi
