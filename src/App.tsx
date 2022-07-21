import React, { useEffect } from 'react';
import './App.css';
import {
  createTheme, CssBaseline, ThemeProvider, useMediaQuery,
} from '@mui/material';
import {
  BrowserRouter, Route, Routes,
} from 'react-router-dom';
import SkinLinePage from './SkinLinePage';
import HomePage from './HomePage';
import AboutPage from './AboutPage';
import NavBar from './NavBar';
import SkinPage from './SkinPage';
import MatchingPage from './MatchingPage';
import SelectChampionsPage from './SelectChampionsPage';
import { useAppDispatch, useAppSelector } from './store/hooks';
import fetchEverything from './store/fetchEverything';
import ChampionPage from './champion/ChampionPage';
import { selectChampions } from './store/championSlice';
import SkinLineColorPage from './SkinLineColorPage';

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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {isLoading ? null
        : (
          <BrowserRouter>
            <NavBar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/champions/:id" element={<ChampionPage />} />
              <Route path="/select" element={<SelectChampionsPage />} />
              <Route path="/skinLines/:id" element={<SkinLinePage />} />
              <Route path="/skinLines/:id/colors/:color" element={<SkinLineColorPage />} />
              <Route path="/skins/:id" element={<SkinPage />} />
              <Route path="/matching" element={<MatchingPage />} />
            </Routes>
          </BrowserRouter>
        )}
    </ThemeProvider>
  );
};

export default App;
