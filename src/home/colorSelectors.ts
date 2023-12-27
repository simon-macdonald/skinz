import { createSelector } from '@reduxjs/toolkit';
import _ from 'lodash';
import { selectChampions } from '../champions/championSlice';
import { selectColors } from '../chromas/colorSlice';
import { selectSkins } from '../skins/skinSlice';
import { DisplayState } from './displaySlice';

export const selectChampionIdToColorsMap = createSelector(
  selectChampions,
  selectSkins,
  (champions, skins) => {
    const championColors: { [key: number]: string[] } = {};
    Object.values(skins.entities).forEach((skin) => {
      if (!skin) {
        return;
      }
      const championId = Math.floor(skin.id / 1000);
      if (!(championId in champions.entities) || !skin.chromas) {
        return;
      }

      skin.chromas.forEach((chroma) => {
        if (!(championId in championColors)) {
          championColors[championId] = [];
        }
        const color = (`${chroma.colors[0]}_${chroma.colors[1]}`).replaceAll('#', '');
        championColors[championId] = championColors[championId].concat(color);
      });
    });
    return championColors;
  },
);

export const selectVisibleColors = (championIds: number[]) => createSelector(
  selectColors,
  selectChampionIdToColorsMap,
  (colors, championColors) => {
    if (championIds.length === 0) {
      return colors.ids;
    }
    const colorsPerChampion = championIds.map((championId) => championColors[championId]);
    return _.intersection(...colorsPerChampion);
  },
);

export const selectColorDisplayStates = (championIds: number[]) => createSelector(
  selectColors,
  selectChampions,
  selectVisibleColors(championIds),
  (colors, champions, visibleColors) => {
    const max = Math.max(...Object.values(champions.entities).map((c) => c!.id));
    const displays: DisplayState[] = new Array(max + 1);
    Object.values(champions).forEach((c) => displays[c.id] = 'visible');
    if (championIds.length === 0) {
      return displays;
    }

    championIds.forEach((championId) => displays[championId] = 'chosen');

    const commonColors = visibleColors.map((colorId) => colors.entities[colorId]!);
    const visibleChampions = commonColors.flatMap((color) => Object.keys(color.chromas)).map((id) => +id);
    Object.keys(champions.entities).forEach((c) => {
      if (displays[+c] !== 'chosen') {
        displays[+c] = visibleChampions.includes(+c) ? 'visible' : 'hidden';
      }
    });
    return displays;
  },
);
