import { createEntityAdapter, createSlice, EntityId } from '@reduxjs/toolkit';
import fetchChampions from './fetchChampions';
import { RootState } from '../glue/store';
import releaseDates from './releaseDates.json';

export interface ChampionItem {
  id: number,
  name: string,
  alias: string,
  squarePortraitPath: string,
  roles: string[],
}

const championAdapter = createEntityAdapter<ChampionItem>({
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

export const sortChronologically = (a: EntityId, b: EntityId) => {
  const aDate = releaseDates[a as keyof typeof releaseDates];
  const bDate = releaseDates[b as keyof typeof releaseDates];
  if (!bDate || !aDate) {
    return 0;
  }
  return bDate.localeCompare(aDate);
};

export default championsSlice.reducer;
