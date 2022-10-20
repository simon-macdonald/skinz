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
import BrowseDrawer from '../home/BrowseDrawer';
import ChallengePage from '../challenges/ChallengePage';

const App = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchEverything(0));
  }, [dispatch]);

  const champions = useAppSelector(selectChampions);

  const isLoading = champions.loading !== 'fulfilled';

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
          <BrowseDrawer />
          <Routes>
            <Route path="/" element={<HomePage />} />
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
