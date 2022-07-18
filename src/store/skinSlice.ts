import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import fetchEverything from './fetchEverything';
import { RootState } from './store';

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
        skinAdapter.upsertMany(state, action.payload.skins);
      });
  },
});

export const selectSkins = (state: RootState) => state.champions;

export default skinsSlice.reducer;
