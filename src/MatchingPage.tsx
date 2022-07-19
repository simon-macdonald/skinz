import {
  Checkbox,
  Container, Grid, Toolbar,
} from '@mui/material';
import { EntityState } from '@reduxjs/toolkit';
import React, { useState } from 'react';
import { selectChosenChampions } from './store/chosenChampionsSlice';
import ChromaCard from './ChromaCard';
import { useAppSelector } from './store/hooks';
import { selectSkins, SkinItem } from './store/skinSlice';

const findSkinIds = (championIds: number[], skins: EntityState<SkinItem>, colors: string[]) => {
  if (championIds.length === 0) {
    const result = skins.ids
      .filter(id => skins.entities[id]!.chromas)
      .flatMap(id => skins.entities[id]!.chromas)
      .filter((chroma: any) => chroma.colors.filter((color: string) => colors.includes(color)).length > 0);
    return result;
  }
  const result = skins.ids
    .filter(id => championIds.includes(Math.floor(+id / 1000)))
    .filter(id => skins.entities[id]!.chromas)
    .flatMap(id => skins.entities[id]!.chromas)
    .filter((chroma: any) => chroma.colors.filter((color: string) => colors.includes(color)).length > 0);
  return result;
};

const allColors = (skins: EntityState<SkinItem>) => {
  const result: { [color: string]: number } = {};
  Object.values(skins.ids)
    .filter(id => skins.entities[id]!.chromas)
    .flatMap(id => skins.entities[id]!.chromas)
    .flatMap((chroma: any) => chroma.colors)
    .forEach((color: string) => {
      if (!(color in result)) {
        result[color] = 0;
      }
      result[color] += 1;
    });
  return Object.entries(result).sort((hex1, hex2) => hex2[1] - hex1[1]).map(((entry) => entry[0]));
};

const MatchingPage = () => {
  const [colors, setColors] = useState<string[]>([]);

  const skins = useAppSelector(selectSkins);

  const championIds = useAppSelector(selectChosenChampions);

  return (
    <Container>
      <Toolbar>
        {}
      </Toolbar>
      <>
        {allColors(skins).map((key) => (
          <Checkbox
            onChange={(event) => {
              if (event.target.checked) {
                setColors([...colors, key]);
              } else {
                setColors(colors.filter((c) => c !== key));
              }
            }}
            sx={{ color: key, '&.Mui-checked': { color: key } }}
            key={key}
          />
        ))}
        <Grid container spacing={5} columns={3}>
          {findSkinIds(championIds.champions, skins, colors!).map((chroma: any) => (
            <ChromaCard name={chroma.name} chromaPath={chroma.chromaPath} key={chroma.id} />
          ))}
        </Grid>
      </>
    </Container>
  );
};

export default MatchingPage;
