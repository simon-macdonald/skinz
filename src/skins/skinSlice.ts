import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../glue/store';
import { PRESTIGE_SKIN_LINE_ID, STAR_GUARDIAN_SKIN_LINE_ID } from '../skinlines/skinLineSlice';
import fetchSkins from './fetchSkins';
import releaseDates from './releaseDates.json';

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
    colorsKey: string, // added for URL-friendly navigation
  }[],
  skinLines: {
    id: number;
  }[] | null;
}

const skinAdapter = createEntityAdapter<SkinItem>({
  sortComparer: (a, b) => {
    // while skins are already sorted chronologically
    // I'd rather not rely on that assumption
    const dateA = releaseDates[a.id.toString() as keyof typeof releaseDates];
    const dateB = releaseDates[b.id.toString() as keyof typeof releaseDates];
    if (!(dateA && dateB)) {
      return -1;
    }
    return dateB.localeCompare(dateA);
  },
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
          skin.chromas?.forEach(chroma => {
            const color1 = chroma.colors[0].replace('#', '');
            const color2 = chroma.colors[1].replace('#', '');
            chroma.colorsKey = `${color1}_${color2}`;
          })

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
