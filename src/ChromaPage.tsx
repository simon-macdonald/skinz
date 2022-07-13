import {
  Container, Grid, Paper, Toolbar, Typography,
} from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { championApi } from './champions/champions';
import ChromaCard from './ChromaCard';
import { useAppSelector } from './hooks';

const ChromaPage = () => {
  const { id } = useParams();

  const skins = useAppSelector(championApi.endpoints.getSkins.select(''));

  return (
    <Container>
      <Toolbar>
        {}
      </Toolbar>
      <Paper>
        <Typography variant="h2">
          {skins.data!.entities[+id!]!.name}
        </Typography>
      </Paper>
      <Grid container spacing={2} columns={12}>
        {skins.data!.entities[+id!]!.chromas && skins.data!.entities[+id!]!.chromas
          .map((chroma) => (
            <ChromaCard name={chroma.name} chromaPath={chroma.chromaPath} key={chroma.id} />
          ))}
      </Grid>
    </Container>
  );
};

export default ChromaPage;
