import { IShowCaseResult } from "@/interfaces/IShowCase"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const showCaseApi = createApi({
  reducerPath: "showCaseApi",
  refetchOnFocus: false,
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/",
  }),
  endpoints: (builder) => ({
    getShowCases: builder.query<
      IShowCaseResult,
      { pageNumber: number; search: string }
    >({
      query: ({ pageNumber, search }) =>
        `showcase/${pageNumber}?search=${search}`,
    }),
    getShowCaseById: builder.query<{ file: string }, { pageNumber: number }>({
      query: ({ pageNumber }) => `showcase/${pageNumber}`,
    }),
  }),
})

export const { useGetShowCasesQuery, useGetShowCaseByIdQuery } = showCaseApi
