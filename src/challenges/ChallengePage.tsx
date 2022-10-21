import React from 'react';
import '../glue/App.css';
import {
  Avatar,
  Button,
  Checkbox,
  Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Tooltip, Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../glue/hooks';
import { selectChallenges } from './challengeSlice';
import { selectChampions } from '../champions/championSlice';
import { clickWhoDidWhatCheckbox, selectWhoDidWhat, WhoDidWhatState } from './whoDidWhatSlice';
import getAssetUrl from '../urls';

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
              <TableCell>
                <Typography variant="h4" gutterBottom>
                  Challenges
                </Typography>
              </TableCell>
              {trackedChallenges.map((challengeName) => {
                const challenge = challenges.entities[challengeName]!;
                const levelToIconPath = challenge.levelToIconPath;
                const howManyChampsDoIHave = whoDidWhat[challengeName as keyof WhoDidWhatState].length;
                const thresholds = challenge.thresholds;
                const iconPath =
                  howManyChampsDoIHave >= thresholds.MASTER.value ? levelToIconPath.MASTER :
                  howManyChampsDoIHave >= thresholds.DIAMOND.value ? levelToIconPath.DIAMOND :
                  howManyChampsDoIHave >= thresholds.PLATINUM.value ? levelToIconPath.PLATINUM :
                  howManyChampsDoIHave >= thresholds.GOLD.value ? levelToIconPath.GOLD :
                  howManyChampsDoIHave >= thresholds.SILVER.value ? levelToIconPath.SILVER :
                  howManyChampsDoIHave >= thresholds.BRONZE.value ? levelToIconPath.BRONZE :
                  howManyChampsDoIHave >= thresholds.IRON.value ? levelToIconPath.IRON :
                  levelToIconPath.IRON;
                return (
                  <TableCell>
                    <Tooltip title={
                      <Typography variant="h4" gutterBottom>
                        {challenge.name + ': ' + challenge.description}
                      </Typography>
                    }>
                      <Avatar src={getChallengeIconPath(iconPath)} />
                    </Tooltip>
                    <Typography variant="h5" gutterBottom>
                      {howManyChampsDoIHave + '/' + thresholds.MASTER.value}
                    </Typography>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {champions.ids.map((id) => champions.entities[id]).map((champion) => (
              <TableRow
                key={champion!.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>
                  <Avatar src={getAssetUrl(champion!.squarePortraitPath)} variant='square' />
                </TableCell>
                {trackedChallenges.map((challenge) => (
                  <TableCell>
                    <Tooltip title={
                      <Typography variant="h4" gutterBottom>
                        {challenge}
                      </Typography>
                    }>
                      <Checkbox
                        checked={whoDidWhat[challenge as keyof WhoDidWhatState].includes(champion!.id)}
                        onChange={() => {dispatch(clickWhoDidWhatCheckbox([challenge, champion!.id]));}}
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
