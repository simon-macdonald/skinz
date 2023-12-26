import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../glue/store';
import fetchChampions from './fetchChampions';

export interface ChampionItem2 {
  id: number,
  name: string,
  alias: string,
  squarePortraitPath: string,
  roles: string[],
}

const championAdapter = createEntityAdapter<ChampionItem2>({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const initialState = championAdapter.getInitialState({ loading: 'idle' });

const championsSlice = createSlice({
  name: 'champions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChampions.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchChampions.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        championAdapter.upsertMany(state, action.payload);
      });
  },
});

export const selectChampions = (state: RootState) => state.champions;

export default championsSlice.reducer;
