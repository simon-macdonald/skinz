import React from 'react';
import '../glue/App.css';
import {
  Avatar,
  Button,
  Checkbox,
  Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Tooltip,
} from '@mui/material';
import { useAppSelector } from '../glue/hooks';
import { selectChallenges } from './challengeSlice';
import { selectChampions } from '../champions/championSlice';

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
// we want https://raw.communitydragon.org/latest/game/assets/challenges/config/202303/tokens/challenger.png
// we have                       /lol-game-data/assets/ASSETS/Challenges/Config/101105/Tokens/CHALLENGER.png

const getChallengeIconPath = (path: string) => {
  const x = `https://raw.communitydragon.org/latest/game/${path.toLowerCase().replace('/lol-game-data/assets/', '')}`;
  console.log(x)
  return x
}

const ChallengePage = () => {
  const challenges = useAppSelector(selectChallenges);
  const champions = useAppSelector(selectChampions);

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
          {champions.ids.map((id) => champions.entities[id]).map((c) => (
            <TableRow
              key={c!.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{c!.name}</TableCell>
              {trackedChallenges.map((c) => (
                <TableCell>
                  {/* <Button variant="text">Text</Button> */}
                  <Checkbox />
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
