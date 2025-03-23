import React, { useEffect } from 'react';
import {
  Box,
  createTheme, CssBaseline, ThemeProvider, useMediaQuery,
} from '@mui/material';
import {
  BrowserRouter, Route, Routes,
} from 'react-router-dom';
import ChallengePage from '../challenges/ChallengePage';
import fetchChallenges from '../challenges/fetchChallenges';
import ChampionPage from '../champions/ChampionPage';
import fetchChampions from '../champions/fetchChampions';
import ColorPage from '../chromas/ColorPage';
import AboutPage from '../home/AboutPage';
import HomePage from '../home/HomePage';
import NavBar from '../home/NavBar';
import SkinLineColorPage from '../home/SkinLineColorPage';
import fetchSkinLines from '../skinlines/fetchSkinLines';
import SkinLinePage from '../skinlines/SkinLinePage';
import fetchSkins from '../skins/fetchSkins';
import SkinPage from '../skins/SkinPage';
import LatestPage from '../titbits/LatestPage';
import { useAppDispatch } from './hooks';
import fetchCharacters from '../harrypotter/fetchCharacters';
import CharacterPage from '../harrypotter/CharacterPage';

const App = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSkins(0));
    dispatch(fetchSkinLines(0));
    dispatch(fetchChampions(0));
    dispatch(fetchChallenges(0));
    dispatch(fetchCharacters(0));
  }, [dispatch]);

  const theme = createTheme({
    palette: {
      mode: prefersDarkMode ? 'dark' : 'light',
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 1200,
        md: 1800,
        lg: 2400,
        xl: 3200,
      },
    },
  });

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
            <Route path="/latest" element={<LatestPage />} />
            <Route path="/harrypotter" element={<CharacterPage />} />
          </Routes>
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
};

export default App;
