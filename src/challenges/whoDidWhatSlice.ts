import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../glue/store';

export interface WhoDidWhatState {
  'All Random All Champions': number[];
  'Same Penta, Different Champ': number[];
  Invincible: number[];
  Perfectionist: number[];
  'Protean Override': number[];
  'Jack of All Champs': number[];
  'Master Yourself': number[];
  'Master the Enemy': number[];
  'Well-Rounded Traveller': number[];
  'Rekindle the Old Furnace': number[];
}

export const whoDidWhatState: WhoDidWhatState = {
  'All Random All Champions': [],
  'Same Penta, Different Champ': [],
  Invincible: [],
  Perfectionist: [],
  'Protean Override': [],
  'Jack of All Champs': [],
  'Master Yourself': [],
  'Master the Enemy': [],
  'Well-Rounded Traveller': [],
  'Rekindle the Old Furnace': [],
};

export const whoDidWhatSlice = createSlice({
  name: 'display',
  initialState: whoDidWhatState,
  reducers: {
    clickWhoDidWhatCheckbox: (state, action: PayloadAction<[string, number]>) => {
      const challengeName = action.payload[0] as keyof WhoDidWhatState;
      const championId = action.payload[1];
      if (state[challengeName].includes(championId)) {
        state[challengeName] = state[challengeName].filter((cid) => cid !== championId);
      } else {
        state[challengeName] = state[challengeName].concat(championId);
      }
    },
  },
});

export const {
  clickWhoDidWhatCheckbox,
} = whoDidWhatSlice.actions;

export const selectWhoDidWhat = (state: RootState) => state.whoDidWhat;

export default whoDidWhatSlice.reducer;
