import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../glue/store';
import fetchSkins from './fetchSkins';
import { PRESTIGE_SKIN_LINE_ID, STAR_GUARDIAN_SKIN_LINE_ID } from './skinLineSlice';

export interface SkinItem {
  id: number,
  name: string,
  tilePath: string,
  splashPath: string,
  uncenteredSplashPath: string,
  chromas: {
    id: number,
    name: string, // this is actually awkwardly the skin name
    chromaPath: string,
    colors: string[],
  }[],
  skinLines: {
    id: number;
  }[] | null;
}

const skinAdapter = createEntityAdapter<SkinItem>({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const initialState = skinAdapter.getInitialState({ loading: 'idle' });

const skinsSlice = createSlice({
  name: 'skins',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkins.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchSkins.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        Object.values(action.payload).forEach((skin) => {
          // stopgap solution to consolidate star guardians
          // update scripts to include skin line IDs
          // move skin and skin-line logic to selectors
          // migrate off of `selectSkins` and `selectSkinLines`
          if (skin.skinLines && [19, 20, 119, 161].includes(skin.skinLines[0].id)) {
            skin.skinLines = [{ id: STAR_GUARDIAN_SKIN_LINE_ID }];
          }
          if (skin.name.includes('Prestige')) {
            skin.skinLines = [{ id: PRESTIGE_SKIN_LINE_ID }];
          }
        });
        skinAdapter.upsertMany(state, action.payload);
      });
  },
});

export const selectSkins = (state: RootState) => state.skins;

export default skinsSlice.reducer;
