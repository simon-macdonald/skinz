import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store/store';

export interface SkinLineHoverState {
  id: number;
}

const initialState: SkinLineHoverState = {
  id: 0,
};

export const skinLineHoverSlice = createSlice({
  name: 'skinLineHover',
  initialState,
  reducers: {
    hoverOver: (state, action: PayloadAction<number>) => {
      state.id = action.payload;
    },
    hoverAway: (state) => {
      state.id = 0;
    },
  },
});

export const { hoverOver, hoverAway } = skinLineHoverSlice.actions;

export const selectSkinLineHover = (state: RootState) => state.skinLineHover.id;

export default skinLineHoverSlice.reducer;
