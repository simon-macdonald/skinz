import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../glue/store';
import fetchSkinLines from './fetchSkinLines';
import universes from './skin_line_to_universe.json';

export interface SkinLineItem {
  id: number,
  name: string,
  universe: string,
}

export const PRESTIGE_SKIN_LINE_ID = 9001;
export const STAR_GUARDIAN_SKIN_LINE_ID = 1337;

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
      .addCase(fetchSkinLines.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchSkinLines.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        const skinLines = Object.values(action.payload).concat([{
          id: PRESTIGE_SKIN_LINE_ID,
          name: 'Prestige',
          universe: '',
        }, {
          id: STAR_GUARDIAN_SKIN_LINE_ID,
          name: 'Star Guardian',
          universe: '',
        }]);
        skinLines.forEach((skinLine) => {
          skinLine.universe
              = Object.prototype.hasOwnProperty.call(universes, skinLine.name)
              ? universes[skinLine.name as keyof typeof universes]
              : 'unknown';
        });
        skinLineAdapter.upsertMany(state, skinLines.filter((skinLine) => !skinLine.name.includes('Star Guardian ')));
      });
  },
});

export const selectSkinLines = (state: RootState) => state.skinLines;

export default skinLinesSlice.reducer;
