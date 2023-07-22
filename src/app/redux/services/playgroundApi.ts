import { IPlayground } from "@/interfaces/IPlayground";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const playgroundApi = createApi({
  reducerPath: "playgroundApi",
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/",
  }),
  endpoints: (builder) => ({
    getCodeByPath: builder.query<IPlayground, { path: string }>({
      query: ({ path }) => path,
    }),
  }),
});

export const { useGetCodeByPathQuery } = playgroundApi;
