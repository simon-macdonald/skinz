import React from 'react';
import './App.css';
import {
  Container, createTheme, Divider, Drawer, GlobalStyles, Grid, Paper, ThemeProvider, Typography, useMediaQuery,
} from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
import SkinLinePage from './SkinLinePage';
import HomePage from './HomePage';

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
      {prefersDarkMode && (
        <GlobalStyles
          styles={{
            body: { backgroundColor: '#121212' },
          }}
        />
      )}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/skinLines/:id" element={<SkinLinePage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
