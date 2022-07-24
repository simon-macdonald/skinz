import {
  Container, Grid, Toolbar, Typography,
} from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../glue/hooks';
import SkinCard from './SkinCard';
import { selectSkinLines } from './skinLineSlice';

const SkinLinePage = () => {
  const { id } = useParams();

  const skinLines = useAppSelector(selectSkinLines);
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
          .map((skinId) => (
            <SkinCard id={skinId} key={skinId} />
          ))}
      </Grid>
    </Container>
  );
};

export default SkinLinePage;
