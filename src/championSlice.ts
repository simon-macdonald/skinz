import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from './store';

export interface ChampionItem {
  id: number,
  name: string,
  alias: string,
  squarePortraitPath: string,
  roles: string[],
}

export const fetchChampionSummary = createAsyncThunk<
  // Return type of the payload creator
  ChampionItem[],
  number,
  // First argument to the payload creator
  {
    // Optional fields for defining thunkApi field types
    dispatch: AppDispatch
    state: RootState
  }
>('champions/fetchChampionSummary', async () => {
  const response = await fetch('https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-summary.json');
  return await response.json();
})

const championAdapter = createEntityAdapter<ChampionItem>({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const initialState = championAdapter.getInitialState({loading: 'idle'});

const championsSlice = createSlice({
    name: 'champions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
      .addCase(fetchChampionSummary.pending, (state) => {
          state.loading = 'pending';
      })
      .addCase(fetchChampionSummary.fulfilled, (state, action) => {
          state.loading = 'fulfilled';
          championAdapter.upsertMany(state, action.payload);
      });
    },
  });

export default championsSlice.reducer;