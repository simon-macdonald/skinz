import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../glue/store';
import fetchChallenges from './fetchChallenges';

export interface ChallengeItem {
  id: number,
  name: string,
  description: string,
  levelToIconPath: {
    IRON: string,
    BRONZE: string,
    SILVER: string,
    GOLD: string,
    PLATINUM: string,
    DIAMOND: string,
    MASTER: string,
    GRANDMASTER: string,
    CHALLENGER: string,
  },
  thresholds: {
    IRON: {
      value: number,
    },
    BRONZE: {
      value: number,
    },
    SILVER: {
      value: number,
    },
    GOLD: {
      value: number,
    },
    PLATINUM: {
      value: number,
    },
    DIAMOND: {
      value: number,
    },
    MASTER: {
      value: number,
    },
    GRANDMASTER: {
      value: number,
    },
    CHALLENGER: {
      value: number,
    },
  },
}

const challengeAdapter = createEntityAdapter<ChallengeItem>({
  selectId: (c) => c.name,
  sortComparer: (c1, c2) => c1.name.localeCompare(c2.name),
});

const initialState = challengeAdapter.getInitialState({ loading: 'idle' });

const challengeSlice = createSlice({
  name: 'challenges',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChallenges.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchChallenges.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        challengeAdapter.upsertMany(state, Object.values(action.payload));
      });
  },
});

export const selectChallenges = (state: RootState) => state.challenges;

export default challengeSlice.reducer;
