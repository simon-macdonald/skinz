import React from 'react';
import '../glue/App.css';
import {
  Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar,
} from '@mui/material';
import { useAppSelector } from '../glue/hooks';
import { selectChallenges } from './challengeSlice';

// 210002 same penta
// 202303 invincible
// 210001 perfectionist
// 101301 all random all champions
// 120002 protean override
// 401106 jack of all champs
// 401104 master yourself
// 401105 master the enemy

const ChallengePage = () => {
  const challenges = useAppSelector(selectChallenges);
  const rows22 = [
    {name: challenges.entities['DPS Threat']!.levelToIconPath.GOLD, calories: 159, fat: 6.0, carbs: 24, protein: 4.0},
  ];

  return (
    <Container>
      <Toolbar>
        {}
      </Toolbar>
      <TableContainer component={Paper}>
        <Table>
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows22.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ChallengePage;
