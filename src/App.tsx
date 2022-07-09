import React from 'react';
import './App.css';
import {
  Container, createTheme, Divider, Drawer, GlobalStyles, Grid, Paper, ThemeProvider, Typography, useMediaQuery,
} from '@mui/material';
import SkinThemeSet from './SkinThemeSet';
import {
  useGetChampionSummaryQuery,
  useGetSkinLinesQuery,
  useGetSkinsQuery,
} from './champions/champions';
import { useAppSelector } from './hooks';
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

const App = () => {
  const champions = useGetChampionSummaryQuery('');
  const skins = useGetSkinsQuery('');
  const skinLines = useGetSkinLinesQuery('', { skip: !skins.isSuccess });
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const title = useAppSelector(selectTitle);
  const champs = useAppSelector(selectChosenChampions);

  if (skinLines.error
    || skinLines.isLoading
    || !skinLines.data
    || skins.error
    || skins.isLoading
    || !skins.data
    || champions.error
    || champions.isLoading
    || !champions.data) {
    return <Typography>Loading</Typography>;
  }

  const theme = createTheme({
    palette: {
      mode: prefersDarkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container>
        {prefersDarkMode && (
        <GlobalStyles
          styles={{
            body: { backgroundColor: '#121212' },
          }}
        />
        )}
        <Grid container spacing={2} columns={60}>
          {champions.data.ids
            .filter((id) => id > 0)
            .filter((id) => champs.champions.includes(id as number)
              || buttonEnabled(
                id as number,
                findThemes(champs.champions, skinLines),
                skinLines,
              ))
            .map((id) => (
              <PortraitCard id={id} />
            ))}
          {champs.champions.length > 0 && <PortraitCard id={-1} />}
        </Grid>
        <Paper>
          <Typography variant="h5">
            skinz.lol isn&apos;t endorsed by Riot Games and doesn&apos;t reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot Games properties. Riot Games, and all associated properties are trademarks or registered trademarks of Riot Games, Inc.
          </Typography>
        </Paper>
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
          <Typography variant="h4">
            Skin Lines
          </Typography>
          <Divider />
          {findThemes(champs.champions, skinLines).map((skinLine) => <SkinThemeSet theme={skinLine} />)}
        </Drawer>
      </Container>
    </ThemeProvider>
  );
};

export default App;
