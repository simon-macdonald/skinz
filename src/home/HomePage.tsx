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

  return (
    <Container>
      <Toolbar>
        {}
      </Toolbar>
      <Grid container spacing={2} columns={60}>
        {champions.ids
          .filter((id) => id > 0)
          .filter((id) => display.displays[+id] !== 'hidden')
          .map((id) => (
            <PortraitCard id={+id} key={id} />
          ))}
        {display.champions.length > 0 && <PortraitCard id={-1} />}
      </Grid>
    </Container>
  );
};

export default HomePage;
