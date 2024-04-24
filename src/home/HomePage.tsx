import React, { useEffect, useState } from 'react';
import {
  Alert,
  Container, Grid, IconButton, InputAdornment, Link, TextField, ToggleButton, ToggleButtonGroup, Toolbar, Typography,
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import { CalendarMonth, Clear, SortByAlpha } from '@mui/icons-material';
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
import draftPositions from './draftPositions.json';
import releaseDates from '../champions/releaseDates.json';

const SHOW_MESSAGE = true;
const MESSAGE = 'Join the Discord.';

const HomePage = (props: { filterBy: FilterBy, }) => {
  const { filterBy } = props;
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const [find, setFind] = useState('');
  const handleFindChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFind(event.target.value);
  };

  const DRAFT_POSITIONS = ['TOP', 'JUNGLE', 'MIDDLE', 'BOTTOM', 'SUPPORT'];
  const [draftPosition, setDraftPosition] = useState('');
  const handleRoleChange = (
    event: React.MouseEvent<HTMLElement>,
    newDraftPosition: string,
  ) => {
    setDraftPosition(newDraftPosition === null ? '' : newDraftPosition);
  };

  enum SortBy {
    Alphabet,
    ReleaseDate,
  }
  const [sortBy, setSortBy] = useState(SortBy.Alphabet);
  const handleSortByChange = (
    event: React.MouseEvent<HTMLElement>,
    newSortBy: SortBy,
  ) => {
    if (newSortBy !== null) {
      setSortBy(newSortBy);
    }
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
    xs: 120,
    sm: 12,
    md: 10,
    lg: 8,
    xl: 5,
  };

  return (
    <>
      <BrowseDrawer filterBy={filterBy} />
      <Container maxWidth={false}>
        <Toolbar>
          {}
        </Toolbar>
        <ChampionSelectionRow />
        {champions.entities[-1] && (
          <Grid container spacing={2} padding={2}>
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
                value={draftPosition}
                exclusive
                onChange={handleRoleChange}
              >
                {DRAFT_POSITIONS.map(((role) => (
                  <ToggleButton value={role}>
                    {role}
                  </ToggleButton>
                )))}
              </ToggleButtonGroup>
            </Grid>
            <Grid item>
              <ToggleButtonGroup
                value={sortBy}
                exclusive
                onChange={handleSortByChange}
              >
                <ToggleButton value={SortBy.Alphabet}>
                  <SortByAlpha />
                </ToggleButton>
                <ToggleButton value={SortBy.ReleaseDate}>
                  <CalendarMonth />
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>
            {SHOW_MESSAGE && (
              <Grid item>
                <Alert severity="info" variant="filled">
                  <Link href="https://discord.gg/psgphuFnhe" target="_blank">
                    <Typography>
                      {MESSAGE}
                    </Typography>
                  </Link>
                </Alert>
              </Grid>
            )}
          </Grid>
        )}
        <Grid container spacing={2} columns={120}>
          {champions.loading === 'fulfilled' && champions.ids
            .filter((id) => id > 0)
            .filter((id) => displayStates[+id] !== 'hidden')
            .filter((id) => displayStates[+id] !== 'chosen')
            .filter((id) => find === '' || champions.entities[id]!.name.toLowerCase().includes(find.toLowerCase()))
            .filter((id) => draftPosition === '' || _.some(draftPositions[champions.entities[id]!.alias as keyof typeof draftPositions], (r) => draftPosition === r))
            .sort((a, b) => (sortBy === SortBy.Alphabet ? champions.entities[a]!.name.localeCompare(champions.entities[b]!.name) : releaseDates[b as keyof typeof releaseDates].localeCompare(releaseDates[a as keyof typeof releaseDates])))
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
