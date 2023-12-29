import React, { useEffect } from 'react';
import {
  Box,
  createTheme, CssBaseline, ThemeProvider, useMediaQuery,
} from '@mui/material';
import {
  BrowserRouter, Route, Routes,
} from 'react-router-dom';
import SkinLinePage from '../skinlines/SkinLinePage';
import HomePage from '../home/HomePage';
import AboutPage from '../home/AboutPage';
import NavBar from '../home/NavBar';
import SkinPage from '../skins/SkinPage';
import { useAppDispatch } from './hooks';
import ChampionPage from '../champions/ChampionPage';
import SkinLineColorPage from '../home/SkinLineColorPage';
import ColorPage from '../chromas/ColorPage';
import ChallengePage from '../challenges/ChallengePage';
import fetchSkins from '../skins/fetchSkins';
import fetchChampions from '../champions/fetchChampions';
import fetchChallenges from '../challenges/fetchChallenges';
import fetchSkinLines from '../skinlines/fetchSkinLines';

const App = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSkins(0));
    dispatch(fetchSkinLines(0));
    dispatch(fetchChampions(0));
    dispatch(fetchChallenges(0));
  }, [dispatch]);

  const theme = createTheme({
    palette: {
      mode: prefersDarkMode ? 'dark' : 'light',
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
          </Routes>
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
};

export default App;
