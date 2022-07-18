import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import fetchEverything from './fetchEverything';

export interface SkinLineItem {
  id: number,
  name: string,
  champions: number[],
  skins: number[],
}

const skinLineAdapter = createEntityAdapter<SkinLineItem>({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const initialState = skinLineAdapter.getInitialState({ loading: 'idle' });

const skinLinesSlice = createSlice({
  name: 'skinLines',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEverything.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchEverything.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        skinLineAdapter.upsertMany(state, action.payload.skinLines);
      });
  },
});

export default skinLinesSlice.reducer;
