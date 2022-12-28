import {
  Container, Grid, Toolbar, Typography,
} from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../glue/hooks';
import BrowseDrawer from '../home/BrowseDrawer';
import ChampionSelectionRow from '../home/ChampionSelectionRow';
import { selectDisplay } from '../home/displaySlice';
import { selectSkins } from '../skins/skinSlice';
import ChromaCard from './ChromaCard';
import chromaNames from './chromaNames.json';

const ColorPage = () => {
  const { color, champions } = useParams();

  const skins = useAppSelector(selectSkins);
  const champs = useAppSelector(selectDisplay);

  const skinLineIds = new Map<number, number>();

  const chromas = skins.ids
    .filter((id) => champions === '_' || champions!.split('_').map((c) => +c).includes(Math.floor(+id / 1000)))
    .filter((id) => skins.entities[id]!.chromas)
    .flatMap((id) => {
      skins.entities[id]!.chromas.forEach((chroma) => {
        const { skinLines } = skins.entities[id]!;
        if (skinLines && skinLines.length > 0) {
          skinLineIds.set(chroma.id, skinLines[0].id);
        }
      });
      return skins.entities[id]!.chromas;
    })
    .filter((chroma) => (`${chroma.colors[0]}_${chroma.colors[1]}`).replaceAll('#', '') === color);

  return (
    <>
      <BrowseDrawer filterBy="chromas" />
      <Container>
        <Toolbar>
          {}
        </Toolbar>
        {champs.champions.length > 0 && <ChampionSelectionRow />}
        <Typography variant="h2">
          {chromaNames[color as keyof typeof chromaNames]}
        </Typography>
        <Grid container spacing={5} columns={3}>
          {chromas.slice(0, 20).map((chroma) => (
            <ChromaCard
              skinName={chroma.name}
              chromaPath={chroma.chromaPath}
              skinLineId={skinLineIds.get(chroma.id)!}
              color={(`${chroma.colors[0]}_${chroma.colors[1]}`).replaceAll('#', '')}
              displayText="skinName"
              key={chroma.id}
            />
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default ColorPage;
