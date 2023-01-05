import React, { useEffect } from 'react';
import '../glue/App.css';
import {
  Container, Grid, Toolbar,
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../glue/hooks';
import {
  clickChamp,
  doChromas,
  doSkins,
  FilterBy,
  selectDisplay,
} from './displaySlice';
import PortraitCard from './PortraitCard';
import { selectChampions } from '../champions/championSlice';
import ChampionSelectionRow from './ChampionSelectionRow';
import BrowseDrawer from './BrowseDrawer';

const HomePage = (props: { filterBy: FilterBy, }) => {
  const { filterBy } = props;
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(filterBy === 'skins' ? doSkins() : doChromas());
    dispatch(clickChamp(-1));
  }, [pathname]);

  const champions = useAppSelector(selectChampions);
  const display = useAppSelector(selectDisplay);

  const champGridItemSizes = {
    xs: 60,
    sm: 12,
    md: 10,
    lg: 6,
    xl: 5,
  };

  return (
    <>
      <BrowseDrawer filterBy={filterBy} />
      <Container>
        <Toolbar>
          {}
        </Toolbar>
        <ChampionSelectionRow />
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
    </>
  );
};

export default HomePage;
