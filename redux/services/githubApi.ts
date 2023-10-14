import { IContributor } from "@/interfaces/IContributor"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const githubApi = createApi({
  reducerPath: "githubApi",
  refetchOnFocus: false,
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/",
  }),
  endpoints: (builder) => ({
    getContributors: builder.query<IContributor, void>({
      query: () => "contributors",
    }),
  }),
})

export const { useGetContributorsQuery } = githubApi
