export {}
// import { createSelector } from '@reduxjs/toolkit';
// import { selectChampions } from '../champions/championSlice2';
// import { selectSkins } from './skinSlice2';

// // input: champion ID number
// // output: champion string name
// const selectSkinToChampionNameMap = createSelector(
//   selectSkins,
//   selectChampions,
//   (skins, champions) => {
//     const championNames: { [key: number]: string } = {};
//     // if (skins.loading !== 'fulfilled' || champions.loading !== 'fulfilled') {
//     //   return championNames;
//     // }
//     Object.values(champions.entities).forEach((champion) => {
//       championNames[champion!.id] = champion!.name;
//     });
//     // const championNames2: { [key: number]: string } = {};
//     // Object.values(skins.entities).forEach((skin) => {
//     //   const championId = Math.floor(skin!.id / 1000);
//     //   championNames2[skin!.id] = championNames[championId];
//     // });
//     return championNames;
//   },
// );
