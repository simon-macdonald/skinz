import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import fetchEverything from '../home/fetchEverything';
import { RootState } from '../glue/store';

export interface ChallengeItem {
  id: number,
  name: string,
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
  selectId: (m) => m.name,
});

const initialState = challengeAdapter.getInitialState({ loading: 'idle' });

const challengeSlice = createSlice({
  name: 'challenges',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEverything.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchEverything.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        const challenges = Object.values(action.payload.challenges.challenges)
        challengeAdapter.upsertMany(state, challenges);
      });
  },
});

export const selectChallenges = (state: RootState) => state.challenges;

export default challengeSlice.reducer;
