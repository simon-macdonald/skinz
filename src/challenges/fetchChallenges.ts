import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../glue/store';
import { ChallengeItem } from './challengeSlice';

const URL = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/challenges.json';

const fetchChallenges = createAsyncThunk<
// Return type of the payload creator
{ challenges: ChallengeItem[] },
number,
// First argument to the payload creator
{
  // Optional fields for defining thunkApi field types
  dispatch: AppDispatch
  state: RootState
}
>('fetchChallenges', async () => (await fetch(URL)).json());

export default fetchChallenges;
