import React from 'react';
import './App.css';
import {
  createTheme, GlobalStyles, ThemeProvider, Typography, useMediaQuery,
} from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  useGetChampionSummaryQuery,
  useGetSkinLinesQuery,
  useGetSkinsQuery,
} from './champions/champions';
import SkinLinePage from './SkinLinePage';
import HomePage from './HomePage';
import AboutPage from './AboutPage';

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
          <Route path="/about" element={<AboutPage />} />
          <Route path="/skinLines/:id" element={<SkinLinePage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
