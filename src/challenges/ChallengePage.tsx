import React from 'react';
import '../glue/App.css';
import {
  Avatar,
  Button,
  Checkbox,
  Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Tooltip,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../glue/hooks';
import { selectChallenges } from './challengeSlice';
import { selectChampions } from '../champions/championSlice';
import { clickWhoDidWhatCheckbox, selectWhoDidWhat, WhoDidWhatState } from './whoDidWhatSlice';

// have the state to store be this array but pointing to champs who have got it
// so like 'ARAM'->[1,2,121] which also makes calculating the bronze/silver/gold really easy
// then maybe just try to get it working with redux, that might make everything easier
// if not then try localstorage

const trackedChallenges = [
  'All Random All Champions',
  'Same Penta, Different Champ',
  'Invincible',
  'Perfectionist',
  'Protean Override',
  'Jack of All Champs',
  'Master Yourself',
  'Master the Enemy',
];

const getChallengeIconPath = (path: string) => `https://raw.communitydragon.org/latest/game/${path.toLowerCase().replace('/lol-game-data/assets/', '')}`

const ChallengePage = () => {
  const challenges = useAppSelector(selectChallenges);
  const champions = useAppSelector(selectChampions);
  const whoDidWhat = useAppSelector(selectWhoDidWhat);
  const dispatch = useAppDispatch();

  return (
    <Container>
      <Toolbar>
        {}
      </Toolbar>
      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Challenge</TableCell>
              {trackedChallenges.map((c) => (
                <TableCell align="right">
                  <Tooltip title={c}>
                    <Avatar src={getChallengeIconPath(challenges.entities[c]!.levelToIconPath.CHALLENGER)} />
                  </Tooltip>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {champions.ids.map((id) => champions.entities[id]).map((champion) => (
              <TableRow
                key={champion!.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{champion!.name}</TableCell>
                {trackedChallenges.map((challenge) => (
                  <TableCell>
                    <Tooltip title={challenge}>
                      <Checkbox
                        checked={whoDidWhat[challenge as keyof WhoDidWhatState].includes(champion!.id)}
                        onClick={() => {dispatch(clickWhoDidWhatCheckbox([challenge, champion!.id]));}}
                      />
                    </Tooltip>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ChallengePage;
