import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../glue/store';
import { ChampionItem2 } from './championSlice2';

const URL = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-summary.json';

const fetchChampions = createAsyncThunk<
// Return type of the payload creator
ChampionItem2[],
number,
// First argument to the payload creator
{
  // Optional fields for defining thunkApi field types
  dispatch: AppDispatch
  state: RootState
}
>('fetchChampions', async () => (await fetch(URL)).json());

export default fetchChampions;
