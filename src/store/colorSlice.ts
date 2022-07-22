import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import fetchEverything from './fetchEverything';
import { RootState } from './store';

export interface ColorItem {
  id: string,
  chromas: {
    [championId: number]: number,
  },
}

const colorAdapter = createEntityAdapter<ColorItem>({
  // sortComparer: (a, b) => Object.keys(a.chromas).length - Object.keys(b.chromas).length,
});

const initialState = colorAdapter.getInitialState({ loading: 'idle' });

const colorSlice = createSlice({
  name: 'colors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEverything.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchEverything.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        const getChromaId = (colors: string[]) => (colors[0] + '_' + colors[1]).replaceAll('#', '');
        const allColors = Object.values(action.payload.skins)
          .filter((skin) => skin.chromas)
          .flatMap((skin) => skin.chromas)
          .map((chroma) => getChromaId(chroma.colors))
          .map((color): ColorItem => { return {id: color, chromas: {}} });
        const colors = _.uniqBy(allColors, 'id');
        const colorIndices = new Map<string, number>();
        for (let i = 0; i < colors.length; i++) {
          colorIndices.set(colors[i].id, i);
        }
        Object.values(action.payload.skins)
          .filter((skin) => skin.chromas)
          .flatMap((skin) => skin.chromas)
          .forEach((chroma) => {
            colors[colorIndices.get(getChromaId(chroma.colors))!].chromas[Math.floor(chroma.id / 1000)] = chroma.id;
          });
        colorAdapter.upsertMany(state, colors);
      });
  },
});

export const selectColors = (state: RootState) => state.colors;

export default colorSlice.reducer;
