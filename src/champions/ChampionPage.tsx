import {
  Container, Grid, Toolbar, Typography,
} from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import SkinCard from '../skins/SkinCard';
import { selectChampions } from './championSlice';
import { useAppSelector } from '../glue/hooks';

const ChampionPage = () => {
  const { id } = useParams();

  const champions = useAppSelector(selectChampions);

  return (
    <Container>
      <Toolbar>
        {}
      </Toolbar>
      <Typography variant="h2">
        {champions.entities[+id!]!.name}
      </Typography>
      <Grid container spacing={5} columns={3}>
        {champions.entities[+id!]!.skins
          .map((skinId) => (
            <SkinCard id={skinId} key={skinId} />
          ))}
      </Grid>
    </Container>
  );
};

export default ChampionPage;