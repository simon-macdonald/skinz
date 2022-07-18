import {
  Container, Grid, Paper, Toolbar, Typography,
} from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { championApi } from './champions/champions';
import { useAppSelector } from './store/hooks';
import SkinCard from './SkinCard';

const SkinLinePage = () => {
  const { id } = useParams();

  const skinLines = useAppSelector(championApi.endpoints.getSkinLines.select(''));

  return (
    <Container>
      <Toolbar>
        {}
      </Toolbar>
      <Paper>
        <Typography variant="h2">
          {skinLines.data!.entities[+id!]!.name}
        </Typography>
      </Paper>
      <Grid container spacing={5} columns={3}>
        {skinLines.data!.entities[+id!]!.skins
          .map((skinId) => (
            <SkinCard id={skinId} key={skinId} />
          ))}
      </Grid>
    </Container>
  );
};

export default SkinLinePage;
