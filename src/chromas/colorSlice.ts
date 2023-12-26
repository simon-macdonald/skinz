import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import { RootState } from '../glue/store';
import chromaNames from './chromaNames.json';
import fetchSkins from '../skins/fetchSkins';

export interface ColorItem {
  id: string,
  chromas: {
    [championId: number]: number,
  },
}

const colorAdapter = createEntityAdapter<ColorItem>({
  sortComparer: (a, b) => Object.keys(b.chromas).length - Object.keys(a.chromas).length,
});

const initialState = colorAdapter.getInitialState({ loading: 'idle' });

const colorSlice = createSlice({
  name: 'colors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkins.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchSkins.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        const getChromaId = (colors: string[]) => (`${colors[0]}_${colors[1]}`).replaceAll('#', '');
        const allColors = Object.values(action.payload)
          .filter((skin) => skin.chromas)
          .flatMap((skin) => skin.chromas)
          .map((chroma) => getChromaId(chroma.colors))
          .map((color): ColorItem => ({ id: color, chromas: {} }));
        const colors = _.uniqBy(allColors, 'id');
        const colorIndices = new Map<string, number>();
        for (let i = 0; i < colors.length; i++) {
          colorIndices.set(colors[i].id, i);
        }
        Object.values(action.payload)
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

export const maybeGetChromaName = (color: string) => chromaNames[color as keyof typeof chromaNames];

export default colorSlice.reducer;
