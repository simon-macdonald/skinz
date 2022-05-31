import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface ChampionState {
  id: number;
  name: string;
  title: string;
}

const initialState: ChampionState = {
  id: 1,
  name: 'Annie',
  title: '',
};

export const championSlice = createSlice({
  name: 'champion',
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
  },
});

export const { setTitle } = championSlice.actions;

export const selectTitle = (state: RootState) => state.champion.title;

export default championSlice.reducer;
