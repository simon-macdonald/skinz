import {
  Container, Grid, Toolbar, Typography,
} from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../glue/hooks';
import BrowseDrawer from '../home/BrowseDrawer';
import SkinCard from './SkinCard';
import { selectSkinLines } from './skinLineSlice';
import ColorsGrid from '../chromas/ColorsGrid';

const SkinLinePage = () => {
  const { id } = useParams();

  const skinLines = useAppSelector(selectSkinLines);
  const skinLine = skinLines.entities[+id!]!;

  return (
    <>
      <BrowseDrawer filterBy="skins" />
      <Container>
        <Toolbar>
          {}
        </Toolbar>
        <Typography variant="h2">
          {skinLine.name}
        </Typography>
        <Grid container spacing={5} columns={3}>
          <Grid item xs={1}>
            <ColorsGrid skinLine={skinLine} />
          </Grid>
          {Object.values(skinLine.skins)
            .map((skinId) => (
              <SkinCard id={skinId} key={skinId} />
            ))}
        </Grid>
      </Container>
    </>
  );
};

export default SkinLinePage;
