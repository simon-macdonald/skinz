import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import fetchEverything from './fetchEverything';
import type { AppDispatch, RootState } from './store';

export type FilterBy = 'skins' | 'chromas' | 'both';
export type DisplayState = 'visible' | 'chosen' | 'skinned' | 'hidden';

export interface ChosenChampionsState {
  champions: number[];
  displays: DisplayState[];
  filterBy: FilterBy;
  hoverSkinLine: number;
  loading: 'idle' | 'pending' | 'fulfilled';
}

const initialState: ChosenChampionsState = {
  champions: [],
  displays: [],
  filterBy: 'both',
  hoverSkinLine: 0,
  loading: 'idle',
};

export const clickChamp = createAsyncThunk<
// Return type of the payload creator
[RootState, number],
number,
// First argument to the payload creator
{
  // Optional fields for defining thunkApi field types
  dispatch: AppDispatch
  state: RootState
}
>('clickChamp', async (championId: number, { getState }) => [getState(), championId]);

export const chosenChampionsSlice = createSlice({
  name: 'chosenChampions',
  initialState,
  reducers: {
    hoverOver: (state, action: PayloadAction<number>) => {
      state.hoverSkinLine = action.payload;
    },
    hoverAway: (state) => {
      state.hoverSkinLine = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEverything.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchEverything.fulfilled, (state, action) => {
        const { champions } = action.payload;
        const max = Math.max(...champions.map((c) => c.id));
        state.displays = new Array(max + 1);
        champions.forEach((c) => state.displays[c.id] = 'visible');
        state.loading = 'fulfilled';
      })
      .addCase(clickChamp.fulfilled, (state, action) => {
        if (action.payload[1] === -1) {
          state.champions = [];
          return;
        }

        state.champions
          = state.champions.includes(action.payload[1])
            ? state.champions.filter((c) => c !== action.payload[1])
            : [...state.champions, action.payload[1]];
      });
  },
});

export const { hoverOver, hoverAway } = chosenChampionsSlice.actions;

export const selectChosenChampions = (state: RootState) => state.chosenChampions;

export default chosenChampionsSlice.reducer;
