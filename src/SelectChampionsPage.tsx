import React from 'react';
import './App.css';
import {
  Container, Grid, Toolbar,
} from '@mui/material';
import { useAppSelector } from './store/hooks';
import {
  selectChosenChampions,
} from './store/chosenChampionsSlice';
import PortraitCard from './PortraitCard';
import { selectChampions } from './store/championSlice';

const SelectChampionsPage = () => {
  const champions = useAppSelector(selectChampions);

  const champs = useAppSelector(selectChosenChampions);

  return (
    <Container>
      <Toolbar>
        {}
      </Toolbar>
      <Grid container spacing={2} columns={60}>
        {champions.ids
          .filter((id) => id > 0)
          .map((id) => (
            <PortraitCard id={id} key={id} />
          ))}
        {champs.champions.length > 0 && <PortraitCard id={-1} />}
      </Grid>
    </Container>
  );
};

export default SelectChampionsPage;
