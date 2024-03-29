import { createSelector } from '@reduxjs/toolkit';
import _ from 'lodash';
import { selectChampions } from '../champions/championSlice';
import { selectSkinLines } from './skinLineSlice';
import { selectSkinLineIdAndChampionIdToSkinIdBiMap } from '../skins/selectors';
import { selectSkins } from '../skins/skinSlice';
import { DisplayState } from '../home/displaySlice';

export const selectSkinLineToColorsMap = createSelector(
  selectSkins,
  (skins) => {
    const skinLineColors: { [key: number]: string[] } = {};
    Object.values(skins.entities)
      .filter((skin) => skin!.chromas)
      .filter((skin) => skin!.skinLines)
      .forEach((skin) => {
        skin!.skinLines?.forEach((skinLine) => {
          if (!(skinLine.id in skinLineColors)) {
            skinLineColors[skinLine.id] = [];
          }
          skin!.chromas.forEach((chroma) => {
            if (skinLineColors[skinLine.id].indexOf(chroma.colorsKey) === -1) {
              skinLineColors[skinLine.id].push(chroma.colorsKey);
            }
          });
        });
      });
    return skinLineColors;
  },
);

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

      skin.skinLines.forEach((skinLine) => {
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
    const skinLinesPerChampion = championIds.map((championId) => championSkinLines[championId]);
    return _.intersection(...skinLinesPerChampion);
  },
);

export const selectSkinLineDisplayStates = (championIds: number[]) => createSelector(
  selectSkinLines,
  selectChampions,
  selectVisibleSkinLines(championIds),
  selectSkinLineIdAndChampionIdToSkinIdBiMap,
  (skinLines, champions, visibleSkinLines, skinIds) => {
    if (champions.loading !== 'fulfilled' || skinLines.loading !== 'fulfilled') {
      return [];
    }
    const max = Math.max(...Object.values(champions.entities).map((c) => c!.id));
    const displays: DisplayState[] = new Array(max + 1);
    Object.values(champions).forEach((c) => displays[c.id] = 'visible');
    if (championIds.length === 0) {
      return displays;
    }

    championIds.forEach((championId) => displays[championId] = 'chosen');

    const commonSkinLines = visibleSkinLines.map((skinLineId) => skinLines.entities[skinLineId]!);
    const visibleChampions = commonSkinLines.flatMap((skinLine) => Object.keys(skinIds[skinLine.id])).map((id) => +id);
    Object.keys(champions.entities).forEach((c) => {
      if (displays[+c] !== 'chosen') {
        displays[+c] = visibleChampions.includes(+c) ? 'visible' : 'hidden';
      }
    });
    return displays;
  },
);
