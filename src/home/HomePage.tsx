import React, { useEffect, useState } from 'react';
import '../glue/App.css';
import {
  Alert,
  Container, Grid, IconButton, InputAdornment, TextField, Toolbar,
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
            <Alert severity="info">{'Prestige skin line added. Let me know if you find any bugs. Merry Christmas y\'all.'}</Alert>
          </Grid>
        </Grid>
        <Grid container spacing={2} columns={60}>
          {champions.ids
            .filter((id) => id > 0)
            .filter((id) => display.displays[+id] !== 'hidden')
            .filter((id) => display.displays[+id] !== 'chosen')
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
