import {
  Checkbox,
  Container, Grid, Toolbar,
} from '@mui/material';
import React, { useState } from 'react';
import { championApi } from './champions/champions';
import { selectChosenChampions } from './champions/chosenChampionsSlice';
import ChromaCard from './ChromaCard';
import { useAppSelector } from './hooks';

const findSkinIds = (championIds: number[], skins: any, colors: string[]) => {
  if (championIds.length === 0) {
    const result = skins.data.ids
      .filter((id: number) => skins.data.entities[id].chromas)
      .flatMap((id: number) => skins.data.entities[id].chromas)
      .filter((chroma: any) => chroma.colors.filter((color: string) => colors.includes(color)).length > 0);
    return result;
  }
  const result = skins.data.ids
    .filter((id: number) => championIds.includes(Math.floor(id / 1000)))
    .filter((id: number) => skins.data.entities[id].chromas)
    .flatMap((id: number) => skins.data.entities[id].chromas)
    .filter((chroma: any) => chroma.colors.filter((color: string) => colors.includes(color)).length > 0);
  return result;
};

const allColors = (skins: any) => {
  const result: { [color: string]: number } = {};
  skins.data.ids
    .filter((id: number) => skins.data.entities[id].chromas)
    .flatMap((id: number) => skins.data.entities[id].chromas)
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

  const skins = useAppSelector(championApi.endpoints.getSkins.select(''));

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
          />
        ))}
        <Grid container spacing={2} columns={12}>
          {findSkinIds(championIds.champions, skins, colors!).map((chroma: any) => (
            <ChromaCard name={chroma.name} chromaPath={chroma.chromaPath} key={chroma.id} />
          ))}
        </Grid>
      </>
    </Container>
  );
};

export default MatchingPage;
