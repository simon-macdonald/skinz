import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../glue/store';
import { SkinLineItem } from './skinLineSlice';

const URL = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/skinlines.json';

const fetchSkinLines = createAsyncThunk<
// Return type of the payload creator
SkinLineItem[],
number,
// First argument to the payload creator
{
  // Optional fields for defining thunkApi field types
  dispatch: AppDispatch
  state: RootState
}
>('fetchSkinLines', async () => (await fetch(URL)).json());

export default fetchSkinLines;
