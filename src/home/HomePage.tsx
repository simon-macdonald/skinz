import React, { useEffect, useState } from 'react';
import {
  Alert,
  Container, Grid, IconButton, InputAdornment, Link, TextField, ToggleButton, ToggleButtonGroup, Toolbar, Typography,
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import { Clear } from '@mui/icons-material';
import _ from 'lodash';
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

const SHOW_MESSAGE = false;
const MESSAGE = 'Prestige and Star Guardian universes added. Let me know if you have suggestions.';

// https://mui.com/material-ui/react-select/
const HomePage = (props: { filterBy: FilterBy, }) => {
  const { filterBy } = props;
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const [find, setFind] = useState('');

  const handleFindChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFind(event.target.value);
  };

  const [roles, setRoles] = React.useState(() => ['assassin', 'fighter', 'mage', 'marksman', 'support', 'tank']);
  const handleRole = (
    event: React.MouseEvent<HTMLElement>,
    newRoles: string[],
  ) => {
    setRoles(newRoles);
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
        {champions.entities[-1] && (
          <Grid container columns={2}>
            <Grid item>
              <TextField
                label="Find Champion"
                variant="outlined"
                value={find}
                onChange={handleFindChange}
                InputProps={{
                  spellCheck: false,
                  endAdornment: (
                    <InputAdornment position="end">
                      {find !== '' && (
                        <IconButton onClick={() => setFind('')}>
                          <Clear />
                        </IconButton>
                      )}
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item>
              <ToggleButtonGroup
                value={roles}
                onChange={handleRole}
              >
                {['assassin', 'fighter', 'mage', 'marksman', 'support', 'tank'].map(((role) => (
                  <ToggleButton value={role}>
                    {role}
                  </ToggleButton>
                )))}
              </ToggleButtonGroup>
            </Grid>
            {SHOW_MESSAGE && (
              <Grid item>
                <Alert severity="info">
                  <Link href="https://discord.gg/psgphuFnhe" target="_blank">
                    <Typography color="white">
                      {MESSAGE}
                    </Typography>
                  </Link>
                </Alert>
              </Grid>
            )}
          </Grid>
        )}
        <Grid container spacing={2} columns={60}>
          {champions.loading === 'fulfilled' && champions.ids
            .filter((id) => id > 0)
            .filter((id) => displayStates[+id] !== 'hidden')
            .filter((id) => displayStates[+id] !== 'chosen')
            .filter((id) => find === '' || champions.entities[id]!.name.toLowerCase().includes(find.toLowerCase()))
            .filter((id) => _.some(champions.entities[id]!.roles, (r) => roles.includes(r)))
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
