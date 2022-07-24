import {
  Container, Grid, Toolbar, Typography,
} from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from './store/hooks';
import { selectSkinLines } from './store/skinLineSlice';
import { selectSkins } from './store/skinSlice';
import ChromaCard from './ChromaCard';

const SkinLineColorPage = () => {
  const { color, champions } = useParams();

  const skins = useAppSelector(selectSkins);
  
  const chromas = skins.ids
    .filter(id => champions!.split('_').map((c) => +c).includes(Math.floor(+id / 1000)))
    .filter(id => skins.entities[id]!.chromas)
    .flatMap(id => skins.entities[id]!.chromas)
    .filter((chroma) => (chroma.colors[0] + '_' + chroma.colors[1]).replaceAll('#', '') === color);
  
  if (champions === '_') {
    return (
      <Container>
        <Toolbar>
          {}
        </Toolbar>
        <Typography variant="h2">
          Select some champions before clicking that link.
        </Typography>
      </Container>
    );
  }
  
  return (
    <Container>
      <Toolbar>
        {}
      </Toolbar>
      <Typography variant="h2">
        {color}
      </Typography>
      <Grid container spacing={5} columns={3}>
        {chromas.map((chroma) => (
          <ChromaCard name={chroma.name} chromaPath={chroma.chromaPath} key={chroma.id} />
        ))}
      </Grid>
    </Container>
  );
};

export default SkinLineColorPage;
