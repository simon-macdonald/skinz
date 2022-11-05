import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import fetchEverything from '../home/fetchEverything';
import { RootState } from '../glue/store';

export interface SkinItem {
  id: number,
  name: string,
  championId: number,
  championName: string,
  tilePath: string,
  splashPath: string,
  uncenteredSplashPath: string,
  chromas: {
    id: number,
    name: string,
    chromaPath: string,
    colors: string[],
  }[],
  skinLines: {
    id: number;
  }[];
}

const skinAdapter = createEntityAdapter<SkinItem>({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const initialState = skinAdapter.getInitialState({ loading: 'idle' });

const skinsSlice = createSlice({
  name: 'skins',
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
        const championNames: { [key: number]: string } = {};
        Object.values(champions).forEach((champion) => {
          championNames[champion.id] = champion.name;
        });
        const { skins } = action.payload;
        Object.values(skins).forEach((skin) => {
          skin.championId = Math.floor(skin.id / 1000);
          skin.championName = championNames[skin.championId];
        });
        skinAdapter.upsertMany(state, action.payload.skins);
      });
  },
});

export const selectSkins = (state: RootState) => state.skins;

export default skinsSlice.reducer;
