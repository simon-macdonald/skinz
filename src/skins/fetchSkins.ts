import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../glue/store';
import { SkinItem2 } from './skinSlice2';

const URL = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/skins.json';

const fetchEverything = createAsyncThunk<
// Return type of the payload creator
SkinItem2,
number,
// First argument to the payload creator
{
  // Optional fields for defining thunkApi field types
  dispatch: AppDispatch
  state: RootState
}
>('fetchSkins', async () => (await fetch(URL)).json());

export default fetchEverything;
