import { Container, Grid } from '@mui/material';
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
      <Grid container spacing={2} columns={12}>
        {skinLines.data!.entities[+id!]!.skins
          .map((skinId) => (
            <SkinCard id={skinId} />
          ))}
      </Grid>
    </Container>
  );
};

export default SkinLinePage;