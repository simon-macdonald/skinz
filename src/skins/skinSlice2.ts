import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import fetchEverything from '../home/fetchEverything';
import { RootState } from '../glue/store';

export interface SkinItem2 {
  id: number,
  name: string,
  tilePath: string,
  splashPath: string,
  uncenteredSplashPath: string,
  chromas: {
    id: number,
    name: string, // this is actually awkwardly the skin name
    chromaPath: string,
    colors: string[],
  }[],
  skinLines: {
    id: number;
  }[] | null;
}

const skinAdapter = createEntityAdapter<SkinItem2>({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const initialState = skinAdapter.getInitialState({ loading: 'idle' });

const skinsSlice = createSlice({
  name: 'skins2',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEverything.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchEverything.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        skinAdapter.upsertMany(state, action.payload.skins);
      });
  },
});

export const selectSkins = (state: RootState) => state.skins2;

export default skinsSlice.reducer;
