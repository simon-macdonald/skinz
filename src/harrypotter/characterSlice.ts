import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../glue/store';
import fetchSkins from './fetchCharacters';

export interface CharacterItem {
  name: string,
  house: string,
  playsQuidditch: boolean,
  position: string,
  quidditchYears: number[],
}

const characterAdapter = createEntityAdapter<CharacterItem>({
  sortComparer: (a, b) => b.name.localeCompare(a.name),
  selectId: (character) => character.name,
});

const initialState = characterAdapter.getInitialState({ loading: 'idle' });

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    addEntry: (state, action: PayloadAction<CharacterItem>) => {
      characterAdapter.addOne(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkins.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchSkins.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        characterAdapter.upsertMany(state, action.payload);
      });
  },
});

export const selectCharacters = (state: RootState) => state.characters;

export const { addEntry } = charactersSlice.actions;
export default charactersSlice.reducer;
