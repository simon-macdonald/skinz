import {
  Container, Grid, Toolbar, Typography,
} from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../glue/hooks';
import { selectSkinLines } from '../skins/skinLineSlice';
import { selectSkins } from '../skins/skinSlice';
import ChromaCard from '../chromas/ChromaCard';

const SkinLineColorPage = () => {
  const { id, color } = useParams();

  const skinLines = useAppSelector(selectSkinLines);
  const skins = useAppSelector(selectSkins);
  const skinLine = skinLines.entities[+id!]!;

  return (
    <Container>
      <Toolbar>
        {}
      </Toolbar>
      <Typography variant="h2">
        {skinLine.name}
      </Typography>
      <Grid container spacing={5} columns={3}>
        {Object.values(skinLine.skins)
          .filter((skinId) => skins.entities[skinId]!.chromas)
          .flatMap((skinId) => skins.entities[skinId]!.chromas)
          .filter((chroma) => (chroma.colors[0] + '_' + chroma.colors[1]).replaceAll('#', '') === color)
          .map((chroma) => (
            <ChromaCard name={chroma.name} chromaPath={chroma.chromaPath} key={chroma.id} />
          ))
        }
      </Grid>
    </Container>
  );
};

export default SkinLineColorPage;
