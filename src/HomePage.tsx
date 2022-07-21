import React from 'react';
import './App.css';
import {
  Container, Divider, Drawer, Grid, Toolbar, Typography,
} from '@mui/material';
import SkinThemeSet from './SkinThemeSet';
import { useAppSelector } from './store/hooks';
import {
  selectChosenChampions,
} from './store/chosenChampionsSlice';
import PortraitCard from './PortraitCard';
import { selectChampions } from './store/championSlice';
import { selectSkinLines } from './store/skinLineSlice';

const HomePage = () => {
  const champions = useAppSelector(selectChampions);
  const skinLines = useAppSelector(selectSkinLines);
  const chosenChampions = useAppSelector(selectChosenChampions);

  const themes = chosenChampions.skinLines.length === 0 ? skinLines.ids : chosenChampions.skinLines;

  return (
    <Container>
      <Toolbar>
        {}
      </Toolbar>
      <Grid container spacing={2} columns={60}>
        {champions.ids
          .filter((id) => id > 0)
          .filter((id) => chosenChampions.displays[+id] !== 'hidden')
          .map((id) => (
            <PortraitCard id={+id} key={id} />
          ))}
        {chosenChampions.champions.length > 0 && <PortraitCard id={-1} />}
      </Grid>
      <Typography variant="h5">
        skinz.lol isn&apos;t endorsed by Riot Games and doesn&apos;t reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot Games properties. Riot Games, and all associated properties are trademarks or registered trademarks of Riot Games, Inc.
      </Typography>
      <Drawer
        sx={{
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          {}
        </Toolbar>
        <Typography variant="h4">
          Skin Lines
        </Typography>
        <Divider />
        {themes.map((skinLine) => <SkinThemeSet theme={skinLine} key={skinLine} />)}
      </Drawer>
    </Container>
  );
};

export default HomePage;
