import React from 'react';
import { Grid } from '@mui/material';
import { useAppSelector } from '../glue/hooks';
import { selectDisplay } from './displaySlice';
import PortraitCard from './PortraitCard';

const ChampionSelectionRow = () => {
  const display = useAppSelector(selectDisplay);

  const selectedChampsGridItemSizes = {
    xs: 60,
    sm: 1,
    md: 1,
    lg: 1,
    xl: 1,
  };

  return (
    <Grid container spacing={5} p={2} columns={5}>
      {display.champions.map((championId) => (
        <PortraitCard id={championId} sizes={selectedChampsGridItemSizes} display />
      ))}
      {[...Array(5 - display.champions.length)].map(() => (
        <PortraitCard id={-1} sizes={selectedChampsGridItemSizes} display />
      ))}
    </Grid>
  );
};

export default ChampionSelectionRow;
