import {
  Container, Grid, Toolbar, Typography,
} from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import SkinCard from '../skins/SkinCard';
import { selectChampions } from './championSlice';
import { useAppSelector } from '../glue/hooks';
import BrowseDrawer from '../home/BrowseDrawer';
import { selectChampionIdToSkinsMap } from './selectors';

const ChampionPage = () => {
  const { id } = useParams();

  const champions = useAppSelector(selectChampions);
  const championSkins = useAppSelector(selectChampionIdToSkinsMap);

  const baseSkinId = +`${id}000`;

  return (
    <>
      <BrowseDrawer filterBy="skins" />
      <Container>
        <Toolbar>
          { }
        </Toolbar>
        <Typography variant="h3">
          {champions.entities[+id!]?.name || '...'}
        </Typography>
        <Grid container sx={{ marginTop: 0 }} spacing={5} columns={3}>
          {championSkins[+id!] && (
            <>
              <SkinCard id={baseSkinId} key={baseSkinId} />
              {
                championSkins[+id!]
                  .filter((skinId) => skinId !== baseSkinId)
                  .map((skinId) => (
                    <SkinCard id={skinId} key={skinId} />
                  ))
              }
            </>
          )}
        </Grid>
      </Container>
    </>
  );
};

export default ChampionPage;
