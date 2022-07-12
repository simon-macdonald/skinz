import { Container, Grid, Toolbar } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { championApi } from './champions/champions';
import { useAppSelector } from './hooks';
import SkinCard from './SkinCard';

const SkinLinePage = () => {
  const { id } = useParams();

  const skinLines = useAppSelector(championApi.endpoints.getSkinLines.select(''));

  return (
    <Container>
      <Toolbar>
        {}
      </Toolbar>
      <Grid container spacing={2} columns={12}>
        {skinLines.data!.entities[+id!]!.skins
          .map((skinId) => (
            <SkinCard id={skinId} key={skinId} />
          ))}
      </Grid>
    </Container>
  );
};

export default SkinLinePage;
