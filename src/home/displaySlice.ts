import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../glue/store';

export type FilterBy = 'skins' | 'chromas';
export type DisplayState = 'visible' | 'chosen' | 'hidden';

export interface ChosenChampionsState {
  champions: number[];
  filterBy: FilterBy;
  hoverSkinLine: number;
}

const initialState: ChosenChampionsState = {
  champions: [],
  filterBy: 'skins',
  hoverSkinLine: 0,
};

export const displaySlice = createSlice({
  name: 'display',
  initialState,
  reducers: {
    hoverOver: (state, action: PayloadAction<number>) => {
      state.hoverSkinLine = action.payload;
    },
    hoverAway: (state) => {
      state.hoverSkinLine = 0;
    },
    doSkins: (state) => {
      state.filterBy = 'skins';
    },
    doChromas: (state) => {
      state.filterBy = 'chromas';
    },
    clickChamp: (state, action: PayloadAction<number>) => {
      const champClicked = action.payload;
      if (champClicked === -1) {
        state.champions = [];
        return;
      }

      state.champions
        = state.champions.includes(champClicked)
          ? state.champions.filter((c) => c !== champClicked)
          : [...state.champions, champClicked];

      if (state.champions.length === 6) {
        state.champions = state.champions.slice(1);
      }
    },
  },
});

export const {
  hoverOver, hoverAway, doSkins, doChromas, clickChamp,
} = displaySlice.actions;

export const selectDisplay = (state: RootState) => state.display;

export default displaySlice.reducer;
