import React from 'react';
import './App.css';
import {
  Container, Grid, Toolbar,
} from '@mui/material';
import {
  championApi,
} from './champions/champions';
import { useAppSelector } from './hooks';
import {
  selectChosenChampions,
} from './champions/chosenChampionsSlice';
import PortraitCard from './PortraitCard';

const SelectChampionsPage = () => {
  const champions = useAppSelector(championApi.endpoints.getChampionSummary.select(''));

  const champs = useAppSelector(selectChosenChampions);

  return (
    <Container>
      <Toolbar>
        {}
      </Toolbar>
      <Grid container spacing={2} columns={60}>
        {champions.data!.ids
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
