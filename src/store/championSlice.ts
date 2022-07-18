import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { fetchEverything } from './fetchEverything';
import { RootState } from './store';

export interface ChampionItem {
  id: number,
  name: string,
  alias: string,
  squarePortraitPath: string,
  roles: string[],
  skins: number[],
}

const championAdapter = createEntityAdapter<ChampionItem>({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const initialState = championAdapter.getInitialState({loading: 'idle'});

const championsSlice = createSlice({
    name: 'champions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
      .addCase(fetchEverything.pending, (state) => {
          state.loading = 'pending';
      })
      .addCase(fetchEverything.fulfilled, (state, action) => {
          state.loading = 'fulfilled';
          const champions = action.payload.champions;
          const championIndices = new Map<number, number>();
          for (let i = 0; i < champions.length; i++) {
            championIndices.set(champions[i].id, i);
          }
          champions.forEach(champion => champion.skins = []);
          Object.values(action.payload.skins).forEach(skin => {
            const championIndex = championIndices.get(Math.floor(skin.id / 1000))!;
            champions[championIndex].skins.push(skin.id);
          });
          championAdapter.upsertMany(state, champions);
      });
    },
  });

export const selectChampions = (state: RootState) => state.champions;

export default championsSlice.reducer;