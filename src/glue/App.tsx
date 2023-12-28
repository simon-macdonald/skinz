import React, { useEffect } from 'react';
import './App.css';
import {
  Box,
  createTheme, CssBaseline, ThemeProvider, useMediaQuery,
} from '@mui/material';
import {
  BrowserRouter, Route, Routes,
} from 'react-router-dom';
import SkinLinePage from '../skins/SkinLinePage';
import HomePage from '../home/HomePage';
import AboutPage from '../home/AboutPage';
import NavBar from '../home/NavBar';
import SkinPage from '../skins/SkinPage';
import { useAppDispatch, useAppSelector } from './hooks';
import fetchEverything from '../home/fetchEverything';
import ChampionPage from '../champions/ChampionPage';
import { selectChampions } from '../champions/championSlice';
import SkinLineColorPage from '../home/SkinLineColorPage';
import ColorPage from '../chromas/ColorPage';
import ChallengePage from '../challenges/ChallengePage';
import fetchSkins from '../skins/fetchSkins';
import fetchChampions from '../champions/fetchChampions';
import { selectSkins } from '../skins/skinSlice';
import { selectSkinLines } from '../skins/skinLineSlice';
import { selectColors } from '../chromas/colorSlice';
import fetchChallenges from '../challenges/fetchChallenges';
import { selectChallenges } from '../challenges/challengeSlice';
import fetchSkinLines from '../skins/fetchSkinLines';

const App = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchEverything(0));
    dispatch(fetchSkins(0));
    dispatch(fetchSkinLines(0));
    dispatch(fetchChampions(0));
    dispatch(fetchChallenges(0));
  }, [dispatch]);

  const challenges = useAppSelector(selectChallenges);
  const champions = useAppSelector(selectChampions);
  const colors = useAppSelector(selectColors);
  const skins = useAppSelector(selectSkins);
  const skinLines = useAppSelector(selectSkinLines);

  const isLoading =
    challenges.loading !== 'fulfilled' &&
    champions.loading !== 'fulfilled' &&
    skins.loading !== 'fulfilled' &&
    skinLines.loading !== 'fulfilled' &&
    colors.loading !== 'fulfilled';

  const theme = createTheme({
    palette: {
      mode: prefersDarkMode ? 'dark' : 'light',
    },
  });

  if (isLoading) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage filterBy="skins" />} />
            <Route path="/chromas" element={<HomePage filterBy="chromas" />} />
            <Route path="/challenges" element={<ChallengePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/champions/:id" element={<ChampionPage />} />
            <Route path="/skinLines/:id" element={<SkinLinePage />} />
            <Route path="/colors/:color/champions/:champions" element={<ColorPage />} />
            <Route path="/skinLines/:id/colors/:color" element={<SkinLineColorPage />} />
            <Route path="/skins/:id" element={<SkinPage />} />
          </Routes>
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
};

export default App;
