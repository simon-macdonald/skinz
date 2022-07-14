import React from 'react';
import './App.css';
import {
  createTheme, CssBaseline, ThemeProvider, useMediaQuery,
} from '@mui/material';
import {
  BrowserRouter, Route, Routes,
} from 'react-router-dom';
import {
  useGetChampionSummaryQuery,
  useGetSkinLinesQuery,
  useGetSkinsQuery,
} from './champions/champions';
import SkinLinePage from './SkinLinePage';
import HomePage from './HomePage';
import AboutPage from './AboutPage';
import NavBar from './NavBar';
import ChromaPage from './ChromaPage';
import MatchingPage from './MatchingPage';
import SelectChampionsPage from './SelectChampionsPage';

const App = () => {
  const champions = useGetChampionSummaryQuery('');
  const skins = useGetSkinsQuery('');
  const skinLines = useGetSkinLinesQuery('', { skip: !skins.isSuccess });
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const isLoading = skinLines.error
    || skinLines.isLoading
    || !skinLines.data
    || skins.error
    || skins.isLoading
    || !skins.data
    || champions.error
    || champions.isLoading
    || !champions.data;

  const theme = createTheme({
    palette: {
      mode: prefersDarkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {isLoading ? null :
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/select" element={<SelectChampionsPage />} />
            <Route path="/skinLines/:id" element={<SkinLinePage />} />
            <Route path="/skins/:id" element={<ChromaPage />} />
            <Route path="/matching" element={<MatchingPage />} />
          </Routes>
        </BrowserRouter>
      }
    </ThemeProvider>
  );
};

export default App;
