import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../glue/store';
import { CharacterItem } from './characterSlice';

const fetchCharacters = createAsyncThunk<
CharacterItem[],
number,
{
  dispatch: AppDispatch
  state: RootState
}
>('fetchCharacters', async () => (await fetch('./quidditch-list.json')).json());

export default fetchCharacters;
