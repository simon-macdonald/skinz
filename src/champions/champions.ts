// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const championApi = createApi({
  reducerPath: 'championApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      mode: 'no-cors',
    },
  }),
  endpoints: (builder) => ({
    getChampionById: builder.query({
      query: (id: number) => `champions/${id}.json`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetChampionByIdQuery } = championApi;
