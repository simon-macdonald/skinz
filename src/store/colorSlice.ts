import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import fetchEverything from './fetchEverything';
import { RootState } from './store';

// build this out but maybe don't use the create adapter thing, that has a pretty rigid
// view of what it should be. what we really need is a tri map for like
// data[skinLine][champion][color] =?> chromas
// maybe even a method would be better like
// const x = (skinLine?, champion?, color?) => return what's missing
export interface ColorItem {
  id: string,
  chromasByChampion: {
    [championId: number]: number,
  },
  chromasBySkinLine: {
    [skinLine: number]: {
      [championId: number]: number,
    },
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
        const colors = Object.values(action.payload.skins)
          .filter((skin) => skin.chromas)
          .flatMap((skin) => skin.chromas)
          .map((chroma) => (chroma.colors[0] + '_' + chroma.colors[1]).replaceAll('#', ''))
          .map((color) => { return {id: color} });
        colorAdapter.upsertMany(state, colors as ColorItem[]);
      });
  },
});

export const selectColors = (state: RootState) => state.colors;

export default colorSlice.reducer;
