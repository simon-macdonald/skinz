import React from 'react';
import '../glue/App.css';
import {
  Container, Grid, Toolbar,
} from '@mui/material';
import { useAppSelector } from '../glue/hooks';
import {
  selectDisplay,
} from './displaySlice';
import PortraitCard from './PortraitCard';
import { selectChampions } from '../champions/championSlice';

const HomePage = () => {
  const champions = useAppSelector(selectChampions);
  const display = useAppSelector(selectDisplay);

  const champGridItemSizes = {
    xs: 60,
    sm: 12,
    md: 10,
    lg: 6,
    xl: 5,
  };

  const selectedChampsGridItemSizes = {
    xs: 60,
    sm: 1,
    md: 1,
    lg: 1,
    xl: 1,
  };

  return (
    <Container>
      <Toolbar>
        {}
      </Toolbar>
      {display.champions.length > 0 && (
      <Grid container spacing={2} columns={5}>
        {display.champions.map((championId) => (
          <PortraitCard id={championId} sizes={selectedChampsGridItemSizes} display />
        ))}
      </Grid>
      )}
      <Grid container spacing={2} columns={60}>
        {champions.ids
          .filter((id) => id > 0)
          .filter((id) => display.displays[+id] !== 'hidden')
          .filter((id) => display.displays[+id] !== 'chosen')
          .map((id) => (
            <PortraitCard id={+id} key={id} sizes={champGridItemSizes} />
          ))}
        {display.champions.length > 0 && <PortraitCard id={-1} sizes={champGridItemSizes} />}
      </Grid>
    </Container>
  );
};

export default HomePage;
