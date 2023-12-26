import { createSelector } from '@reduxjs/toolkit';
import { selectChampions } from './championSlice';
import { selectSkins } from '../skins/skinSlice';

export const selectChampionIdToSkinsMap = createSelector(
  selectSkins,
  selectChampions,
  (skins, champions) => {
    const championSkins: { [key: string]: number[] } = {};
    if (skins.loading !== 'fulfilled' || champions.loading !== 'fulfilled') {
      return championSkins;
    }
    Object.values(skins.entities).forEach((skin) => {
      const championId = Math.floor(skin!.id / 1000);
      if (!(championId in championSkins)) {
        championSkins[championId] = [];
      }
      championSkins[championId] = championSkins[championId].concat(skin!.id);
    });
    return championSkins;
  },
);
