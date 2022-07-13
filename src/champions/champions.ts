// Need to use the React-specific entry point to import createApi
import { createEntityAdapter } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface ChampionSummaryItem {
  id: number,
  name: string,
  alias: string,
  squarePortraitPath: string,
  roles: string[],
}
const championSummaryItemAdapter = createEntityAdapter<ChampionSummaryItem>({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

export interface SkinLineItem {
  id: number,
  name: string,
  champions: number[],
  skins: number[],
}
const skinLineItemAdapter = createEntityAdapter<SkinLineItem>({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

export interface SkinItem {
  id: number,
  name: string,
  tilePath: string,
  splashPath: string,
  uncenteredSplashPath: string,
  chromas: {
    id: number,
    name: string,
    chromaPath: string,
  }[],
  skinLines: {
    id: number;
  }[];
}
const skinItemAdapter = createEntityAdapter<SkinItem>({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

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
    getChampionSummary: builder.query({
      query: () => 'champion-summary.json',
      transformResponse: (response: ChampionSummaryItem[]) => championSummaryItemAdapter.addMany(
        championSummaryItemAdapter.getInitialState(),
        response,
      ),
    }),
    getSkinLines: builder.query({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        const skinLines = await fetchWithBQ('skinlines.json');
        const otherwise = skinLines.data as SkinLineItem[];
        otherwise.forEach((element) => {
          element.champions = []; // eslint-disable-line no-param-reassign
          element.skins = []; // eslint-disable-line no-param-reassign
        });
        const skins = await fetchWithBQ('skins.json');
        Object.values(skins.data as SkinItem[]).forEach((entry) => {
          if (entry.skinLines) {
            entry.skinLines.forEach((skinLine) => {
              try {
                const championId = Math.floor(entry.id / 1000);
                otherwise[skinLine.id].champions.push(championId);
                otherwise[skinLine.id].skins.push(entry.id);
              } catch (error) {
                console.log('whoops');
                console.log(entry.id);
                console.log(skinLine.id);
                console.log(otherwise);
              }
            });
          }
        });
        const result = skinLineItemAdapter.addMany(
          skinLineItemAdapter.getInitialState(),
          skinLines.data as SkinLineItem[],
        );
        return { data: result };
      },
    }),
    getSkins: builder.query({
      query: () => 'skins.json',
      transformResponse: (response: SkinItem[]) => skinItemAdapter.addMany(
        skinItemAdapter.getInitialState(),
        response,
      ),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetChampionByIdQuery,
  useGetChampionSummaryQuery,
  useGetSkinLinesQuery,
  useGetSkinsQuery,
} = championApi;
