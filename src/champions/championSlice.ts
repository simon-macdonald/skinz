import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import fetchEverything from '../home/fetchEverything';
import { RootState } from '../glue/store';

export interface ChampionItem {
  id: number,
  name: string,
  alias: string,
  squarePortraitPath: string,
  roles: string[],
  skinLines: number[],
  skins: number[],
  skinz: {
    [skinLine: number]: number,
  },
  colors: {
    [color: string]: number,
  },
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
      .addCase(fetchEverything.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchEverything.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        const { champions } = action.payload;
        const championIndices = new Map<number, number>();
        for (let i = 0; i < champions.length; i++) {
          championIndices.set(champions[i].id, i);
        }
        champions.forEach((champion) => {
          champion.skins = [];
          champion.skinLines = [];
          champion.colors = {};
          champion.skinz = {};
        });
        Object.values(action.payload.skins).forEach((skin) => {
          const championIndex = championIndices.get(Math.floor(skin.id / 1000))!;
          if (!(championIndex in champions)) {
            return;
          }
          champions[championIndex].skins.push(skin.id);
          skin.skinLines?.forEach((skinLine) => {
            const { skinLines } = champions[championIndex];
            if (!skinLines.includes(skinLine.id)) {
              skinLines.push(skinLine.id);
            }
            champions[championIndex].skinz[skinLine.id] = skin.id;
          });
          skin.chromas?.forEach((chroma) => {
            const chromas = champions[championIndex].colors;
            chromas[(`${chroma.colors[0]}_${chroma.colors[1]}`).replaceAll('#', '')] = chroma.id;
          });
        });
        championAdapter.upsertMany(state, champions);
      });
  },
});

export const selectChampions = (state: RootState) => state.champions;

export default championsSlice.reducer;
