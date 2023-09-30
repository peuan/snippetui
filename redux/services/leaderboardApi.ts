import { ILeaderboard } from "@/interfaces/ILeaderboard"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const leaderboardApi = createApi({
  reducerPath: "leaderboardApi",
  refetchOnFocus: false,
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/",
  }),
  endpoints: (builder) => ({
    getLeaderboard: builder.query<ILeaderboard, { path: string }>({
      query: ({ path }) => path,
    }),
  }),
})

export const { useGetLeaderboardQuery } = leaderboardApi
