import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store/store';

export interface ChampionState {
  id: number;
  name: string;
  squarePortraitPath: string;
}

export interface Champions {
  [id: number]: ChampionState;
}

const initialState: Champions = {};

export const championSlice = createSlice({
  name: 'champions',
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state[0].name = action.payload;
    },
  },
});

export const { setTitle } = championSlice.actions;

export const selectTitle = (state: RootState) => state.champion.title;

export default championSlice.reducer;
