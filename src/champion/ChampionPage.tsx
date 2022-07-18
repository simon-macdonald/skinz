import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container, Grid, Paper, Toolbar, Typography,
} from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import SkinCard from '../SkinCard';
import { selectChampions } from '../store/championSlice';
import { useAppSelector } from '../store/hooks';
import { selectSkins } from '../store/skinSlice';

const ChampionPage = () => {
  const { id } = useParams();

  const champions = useAppSelector(selectChampions);
  const skins = useAppSelector(selectSkins);

  return (
    <Container>
      <Toolbar>
        {}
      </Toolbar>
      <Paper>
        <Typography variant="h2">
          {skins.entities[+id!]!.name}
        </Typography>
      </Paper>
      <Grid container spacing={5} columns={12}>
        {skins.entities[+id!]!.skins
          .map((skinId) => (
            <SkinCard id={skinId} key={skinId} />
          ))}
      </Grid>
    </Container>
  );
};

export default ChampionPage;
