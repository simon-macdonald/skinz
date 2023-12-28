import { createSelector } from '@reduxjs/toolkit';
import _ from 'lodash';
import { selectSkinLines } from '../skins/skinLineSlice';
import { selectSkins } from '../skins/skinSlice';

export const selectSkinIdAndChampionIdToSkinIdBiMap = createSelector(
  selectSkins,
  selectSkinLines,
  (skins, skinLines) => {
    const skinIds: {
      [skinId: number]: {
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
            skinIds[skinLine.id] = {}
          }
          skinIds[skinLine.id][Math.floor(skin.id / 1000)] = skin.id;
        });
      });
    return skinIds;
  }
);