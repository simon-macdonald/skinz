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
import { selectSkinIdAndChampionIdToSkinIdBiMap } from './selectors';

const SkinLinePage = () => {
  const { id } = useParams();

  const skinLines = useAppSelector(selectSkinLines);
  const skinIds = useAppSelector(selectSkinIdAndChampionIdToSkinIdBiMap);
  const skinLine = skinLines.entities[+id!];

  return (
    <>
      <BrowseDrawer filterBy="skins" />
      <Container>
        <Toolbar>
          {}
        </Toolbar>
        <Typography variant="h3">
          {skinLine?.name || '...'}
        </Typography>
        <Grid container sx={{ marginTop: 0 }} spacing={5} columns={3}>
          <Grid item xs={1}>
            <Typography variant="h5">
              Universe: {skinLine?.universe || '...'}
            </Typography>
            <ColorsGrid skinLine={skinLine} />
          </Grid>
          {skinLine && skinIds && skinIds[skinLine.id] && Object.values(skinIds[skinLine.id])
            .map((skinId) => (
              <SkinCard id={skinId} key={skinId} />
            ))}
        </Grid>
      </Container>
    </>
  );
};

export default SkinLinePage;
