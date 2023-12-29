import React, { useEffect, useState } from 'react';
import {
  Alert,
  Container, Grid, IconButton, InputAdornment, Link, Skeleton, TextField, Toolbar, Typography,
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import { Clear } from '@mui/icons-material';
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
import { selectSkinLineDisplayStates } from '../skinlines/skinLineSelectors';
import { selectColorDisplayStates } from '../chromas/colorSelectors';

const HomePage = (props: { filterBy: FilterBy, }) => {
  const { filterBy } = props;
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const [find, setFind] = useState('');

  const handleFindChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFind(event.target.value);
  };

  useEffect(() => {
    dispatch(filterBy === 'skins' ? doSkins() : doChromas());
    dispatch(clickChamp(-1));
    setFind('');
  }, [pathname]);

  const champions = useAppSelector(selectChampions);
  const display = useAppSelector(selectDisplay);
  const skinLineDisplayStates = useAppSelector(selectSkinLineDisplayStates(display.champions));
  const colorDisplayStates = useAppSelector(selectColorDisplayStates(display.champions));

  const displayStates
    = display.filterBy === 'chromas'
      ? colorDisplayStates
      : skinLineDisplayStates;

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
        <Grid container columns={2}>
          <Grid item>
            <TextField
              label="Find Champion"
              variant="outlined"
              value={find}
              onChange={handleFindChange}
              InputProps={{
                spellCheck: false,
                endAdornment:
  <InputAdornment position="end">
    {find !== '' && (
    <IconButton onClick={() => setFind('')}>
      <Clear />
    </IconButton>
    )}
  </InputAdornment>,
              }}
            />
          </Grid>
          <Grid item>
            <Alert severity="info">
              <Link href="https://discord.gg/psgphuFnhe" target="_blank">
                <Typography color="white">
                  Prestige and Star Guardian "universes" added. Let me know if you have suggestions.
                </Typography>
              </Link>
            </Alert>
          </Grid>
        </Grid>
        <Grid container spacing={2} columns={60}>
          {champions.loading === 'fulfilled' && champions.ids
            .filter((id) => id > 0)
            .filter((id) => displayStates[+id] !== 'hidden')
            .filter((id) => displayStates[+id] !== 'chosen')
            .filter((id) => find === '' || champions.entities[id]!.name.toLowerCase().includes(find.toLowerCase()))
            .map((id) => (
              <PortraitCard id={+id} key={id} sizes={champGridItemSizes} setFindChampion={setFind} />
            ))}
          {display.champions.length > 0 && <PortraitCard id={-1} sizes={champGridItemSizes} setFindChampion={setFind} />}
        </Grid>
      </Container>
    </>
  );
};

export default HomePage;
