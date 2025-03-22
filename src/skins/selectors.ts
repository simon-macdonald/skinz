import { createSelector } from '@reduxjs/toolkit';
import { selectSkinLines } from '../skinlines/skinLineSlice';
import { selectSkins } from './skinSlice';

export const selectSkinLineIdAndChampionIdToSkinIdBiMap = createSelector(
  selectSkins,
  selectSkinLines,
  (skins, skinLines) => {
    const skinIds: {
      [skinLineId: number]: {
        [championId: number]: number
      }
    } = {};
    if (skins.loading !== 'fulfilled' || skinLines.loading !== 'fulfilled') {
      return skinIds;
    }
    Object
      .values(skins.entities)
      .forEach((skin) => {
        skin?.skinLines?.forEach((skinLine) => {
          if (!(skinLine.id in skinIds)) {
            skinIds[skinLine.id] = {};
          }
          skinIds[skinLine.id][Math.floor(skin.id / 1000)] = skin.id;
        });
      });
    return skinIds;
  },
);

export const selectChronologicalSkinIds = (skinLineId: number) => createSelector(
  selectSkins,
  selectSkinLineIdAndChampionIdToSkinIdBiMap,
  (skins, skinIdsMap) => {
    if (skins.loading !== 'fulfilled' || Object.keys(skinIdsMap).length === 0) {
      return [];
    }
    const skinIds = Object.values(skinIdsMap[skinLineId]);
    // identical to sorting that happens in skinSlice.ts
    return skinIds.sort((a, b) => {
      const skinA = skins.entities[a];
      const skinB = skins.entities[b];
      if (!skinA || !skinB) {
        return -1;
      }
      return skinB.releaseDate.localeCompare(skinA.releaseDate);
    });
  },
);

export const selectSplashTileUrl = (championId: number) => createSelector(
  selectSkins,
  (skins) => {
    if (championId == null) {
      return '';
    }

    const STRIP_URL_PREFIX = '/lol-game-data/assets';
    if (championId === -1) {
      return 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/-1.png';
    }

    const BASE_SKIN_POSTFIX = 1000;
    const baseSkin = skins.entities[championId * BASE_SKIN_POSTFIX]!;
    const x = baseSkin.tilePath.toLowerCase().substring(STRIP_URL_PREFIX.length);
    return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default${x}`;
  },
);
