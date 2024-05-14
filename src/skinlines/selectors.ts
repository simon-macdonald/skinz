import { createSelector } from '@reduxjs/toolkit';
import _ from 'lodash';
import { selectSkins } from '../skins/skinSlice';
import { selectSkinLines } from './skinLineSlice';

export const selectSkinLineReleaseDates = createSelector(
  selectSkins,
  selectSkinLines,
  (skins, skinLines) => {
    const releaseDates: { [key: number]: string } = {};
    if (skins.loading !== 'fulfilled' || skinLines.loading !== 'fulfilled') {
      return releaseDates;
    }

    skins.ids.forEach((skinId) => {
      const skin = skins.entities[skinId]!;
      const skinLineIds = skin.skinLines?.map((sl) => sl.id);
      skinLineIds?.forEach((skinLineId) => {
        releaseDates[skinLineId] = _.min([releaseDates[skinLineId], skin.releaseDate])!;
      });
    });

    return releaseDates;
  },
);

export const selectSkinLineReleaseDate = (skinLineId: number) => createSelector(
  selectSkinLineReleaseDates,
  (skinLineReleaseDates) => skinLineReleaseDates[skinLineId],
);

export const selectNewestSkinLineId = createSelector(
  selectSkinLineReleaseDates,
  (skinLineReleaseDates) => {
    const pairs = Object.entries(skinLineReleaseDates).map(([key, value]) => ({ key, value }));
    return _.maxBy(pairs, 'value')!;
  },
);
