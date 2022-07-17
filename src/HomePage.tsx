import React from 'react';
import './App.css';
import {
  Container, Divider, Drawer, Grid, Toolbar, Typography,
} from '@mui/material';
import SkinThemeSet from './SkinThemeSet';
import {
  championApi,
} from './champions/champions';
import { useAppSelector } from './store/hooks';
import { selectTitle } from './champions/championSlice';
import {
  selectChosenChampions,
} from './champions/chosenChampionsSlice';
import PortraitCard from './PortraitCard';

function findThemes(champions: number[], skinLines: any): number[] {
  if (champions.length === 0) {
    return skinLines.data.ids;
  }

  const answers1: number[] = [];
  skinLines.data.ids.forEach((k: number) => {
    const champs = skinLines.data.entities[k].champions;
    let allIn = true;
    champions.forEach((c) => {
      if (!champs || !champs.includes(c)) {
        allIn = false;
      }
    });
    if (allIn) {
      answers1.push(skinLines.data.entities[k].id);
    }
  });
  return answers1;
}

const buttonEnabled = (
  championId: number,
  themes: number[],
  skinLines: any,
) => {
  if (themes.length === 0) {
    return true;
  }
  let found = false;
  themes.forEach((theme) => {
    skinLines.data.entities[theme].champions.forEach((c: number) => {
      if (championId === c) {
        found = true;
      }
    });
  });
  return found;
};

const HomePage = () => {
  const skinLines = useAppSelector(championApi.endpoints.getSkinLines.select(''));
  const champions = useAppSelector(championApi.endpoints.getChampionSummary.select(''));

  const title = useAppSelector(selectTitle);
  const champs = useAppSelector(selectChosenChampions);

  return (
    <Container>
      <Toolbar>
        {}
      </Toolbar>
      <Grid container spacing={2} columns={60}>
        {champions.data!.ids
          .filter((id) => id > 0)
          .filter((id) => champs.champions.includes(id as number)
              || buttonEnabled(
                id as number,
                findThemes(champs.champions, skinLines),
                skinLines,
              ))
          .map((id) => (
            <PortraitCard id={id} key={id} />
          ))}
        {champs.champions.length > 0 && <PortraitCard id={-1} />}
      </Grid>
      <Typography variant="h5">
        skinz.lol isn&apos;t endorsed by Riot Games and doesn&apos;t reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot Games properties. Riot Games, and all associated properties are trademarks or registered trademarks of Riot Games, Inc.
      </Typography>
      {false && `Latest Pick: ${title}`}
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
        {findThemes(champs.champions, skinLines).map((skinLine) => <SkinThemeSet theme={skinLine} key={skinLine} />)}
      </Drawer>
    </Container>
  );
};

export default HomePage;
