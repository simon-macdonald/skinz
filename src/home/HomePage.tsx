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
    xs: 30,
    sm: 20,
    md: 12,
    lg: 10,
    xl: 6,
  };

  return (
    <Container>
      <Toolbar>
        {}
      </Toolbar>
      {display.champions.length > 0 && (
      <Grid container spacing={2} columns={60}>
        {display.champions.map((championId) => (
          <PortraitCard id={championId} sizes={champGridItemSizes} />
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
