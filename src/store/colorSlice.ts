import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
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
