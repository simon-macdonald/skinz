import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store/store';

export interface ChosenChampionsState {
  champions: number[];
}

const initialState: ChosenChampionsState = {
  champions: [],
};

export const chosenChampionsSlice = createSlice({
  name: 'chosenChampions',
  initialState,
  reducers: {
    clickChampion: (state, action: PayloadAction<number>) => {
      if (action.payload === -1) {
        state.champions = [];
        return;
      }

      state.champions = state.champions.includes(action.payload)
        ? state.champions.filter((c) => c !== action.payload)
        : [...state.champions, action.payload];
    },
  },
});

export const { clickChampion } = chosenChampionsSlice.actions;

export const selectChosenChampions = (state: RootState) => state.chosenChampions;

export default chosenChampionsSlice.reducer;
