import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../glue/store';
import { SkinItem } from './skinSlice';

const URL = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/skins.json';

const fetchSkins = createAsyncThunk<
// Return type of the payload creator
SkinItem[],
number,
// First argument to the payload creator
{
  // Optional fields for defining thunkApi field types
  dispatch: AppDispatch
  state: RootState
}
>('fetchSkins', async () => (await fetch(URL)).json());

export default fetchSkins;
