import { createSelector } from '@reduxjs/toolkit';
import _ from 'lodash';
import { selectChampions } from '../champions/championSlice';
import { PRESTIGE_SKIN_LINE_ID, selectSkinLines } from '../skins/skinLineSlice';
import { selectSkins } from '../skins/skinSlice';

export const selectChampionIdToSkinLinesMap = createSelector(
  selectChampions,
  selectSkins,
  (champions, skins) => {
    const championSkinLines: { [key: number]: number[] } = {};
    Object.values(skins.entities).forEach((skin) => {
      if (!skin) {
        return;
      }
      const championId = Math.floor(skin.id / 1000);
      if (!(championId in champions.entities) || !skin.skinLines) {
        return;
      }

      const skinLines
        = skin.name.includes('Prestige')
          ? [{ id: PRESTIGE_SKIN_LINE_ID }]
          : skin.skinLines;
      skinLines.forEach((skinLine) => {
        if (!(championId in championSkinLines)) {
          championSkinLines[championId] = [];
        }
        championSkinLines[championId] = championSkinLines[championId].concat(skinLine.id);
      });
    });
    return championSkinLines;
  },
);

export const selectVisibleSkinLines = (championIds: number[]) => createSelector(
  selectSkinLines,
  selectChampionIdToSkinLinesMap,
  (skinLines, championSkinLines) => {
    if (championIds.length === 0) {
      return skinLines.ids;
    }
    const skinLinesPerChampion = championIds.map(championId => championSkinLines[championId]);
    return _.intersection(...skinLinesPerChampion);
  }
)