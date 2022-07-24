import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import fetchEverything from '../home/fetchEverything';
import { RootState } from '../glue/store';

export interface SkinLineItem {
  id: number,
  name: string,
  skins: {
    [championId: number]: number,
  },
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
        const { skinLines } = action.payload;
        skinLines.forEach((skinLine) => {
          skinLine.skins = {};
        });
        Object
          .values(action.payload.skins)
          .filter((skin) => skin.skinLines)
          .forEach((skin) => {
            skin.skinLines.forEach((skinLine) => {
              skinLines[skinLine.id].skins[Math.floor(skin.id / 1000)] = skin.id;
            });
          });
        skinLineAdapter.upsertMany(state, skinLines);
      });
  },
});

export const selectSkinLines = (state: RootState) => state.skinLines;

export default skinLinesSlice.reducer;
