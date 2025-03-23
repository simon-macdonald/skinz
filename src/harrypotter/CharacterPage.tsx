import React, { useState } from 'react';
import {
  Checkbox,
  Container, IconButton, InputAdornment, MenuItem, Paper, Select, SelectChangeEvent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar, Tooltip, Typography,
} from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import {
  AddCircle,
  Cancel, CheckCircle,
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../glue/hooks';
import { addEntry, selectCharacters } from './characterSlice';

const CharacterPage = () => {
  const characters = useAppSelector(selectCharacters);
  const dispatch = useAppDispatch();

  const [name, setName] = useState('');
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  // House colors
  const houseColors = {
    Gryffindor: '#740001',
    Hufflepuff: '#FFD800',
    Ravenclaw: '#0E1A40',
    Slytherin: '#1A472A',
  };

  const houses = ['Gryffindor', 'Hufflepuff', 'Ravenclaw', 'Slytherin'];
  const [house, setHouse] = useState(houses[0]);
  const handleHouseChange = (event: SelectChangeEvent<string>) => {
    setHouse(event.target.value);
  };

  const [playsQuidditch, setPlaysQuidditch] = useState(true);
  const handlePlaysQuidditchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlaysQuidditch(event.target.checked);
  };

  const positions = ['Keeper', 'Seeker', 'Beater'];
  const [position, setPosition] = useState(positions[0]);
  const handlePositionChange = (event: SelectChangeEvent<string>) => {
    setPosition(event.target.value);
  };

  const [quidditchYears, setYears] = useState('');
  const handleYearsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setYears(event.target.value);
  };

  const stringToIntArray = (year: string) => year.split(' ').map(Number).filter((y) => y !== 0);
  const handleAdd = () => {
    dispatch(addEntry({
      name,
      house,
      playsQuidditch,
      position: playsQuidditch ? position : '',
      quidditchYears: playsQuidditch ? stringToIntArray(quidditchYears) : [],
    }));
    setName('');
    setHouse(houses[0]);
    setPlaysQuidditch(true);
    setPosition(positions[0]);
    setYears('');
  };

  return (
    <Container>
      <Toolbar>
        {}
      </Toolbar>
      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell key="characters">
                <Typography variant="h4" gutterBottom>
                  Characters
                  <Tooltip title={(
                    <Typography variant="h4" gutterBottom>
                      Who plays Quidditch at Hogwarts?
                    </Typography>
                    )}
                  >
                    <HelpIcon />
                  </Tooltip>
                </Typography>
              </TableCell>
              <TableCell key="house">
                House
              </TableCell>
              <TableCell key="playsQuidditch">
                Plays Quidditch?
              </TableCell>
              <TableCell key="position">
                Position
              </TableCell>
              <TableCell key="quidditchYears">
                Quidditch Years
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell key="name">
                <TextField
                  label="Add new"
                  variant="outlined"
                  value={name}
                  onChange={handleNameChange}
                  InputProps={{
                    spellCheck: false,
                    endAdornment:
  <InputAdornment position="end">
    {name !== '' && (
    <IconButton onClick={handleAdd}>
      <AddCircle color="primary" />
    </IconButton>
    )}
  </InputAdornment>,
                  }}
                />
              </TableCell>
              <TableCell>
                <Select
                  id="hogwarts-house"
                  value={house}
                  onChange={handleHouseChange}
                  displayEmpty
                >
                  {houses.map((h) => (
                    <MenuItem
                      key={h}
                      value={h}
                      sx={{
                        '&.Mui-selected': {
                          borderLeft: `6px solid ${houseColors[h as keyof typeof houseColors]}`,
                        },
                      }}
                    >
                      {h}
                    </MenuItem>
                  ))}
                </Select>
              </TableCell>
              <TableCell key="playsQuidditch">
                <Checkbox
                  checked={playsQuidditch}
                  onChange={handlePlaysQuidditchChange}
                />
              </TableCell>
              <TableCell>
                <Select
                  id="position"
                  value={position}
                  onChange={handlePositionChange}
                  displayEmpty
                >
                  {positions.map((p) => (
                    <MenuItem key={p} value={p}>
                      {p}
                    </MenuItem>
                  ))}
                </Select>
              </TableCell>
              <TableCell key="years">
                <TextField
                  label="Years"
                  variant="outlined"
                  value={quidditchYears}
                  onChange={handleYearsChange}
                />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {characters.ids.map((id) => characters.entities[id]!).map((character) => (
              <TableRow
                key={character.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell key="name">
                  {character.name}
                </TableCell>
                <TableCell
                  key="house"
                  sx={{
                    borderLeft: `6px solid ${houseColors[character.house as keyof typeof houseColors] || 'transparent'}`,
                    paddingLeft: 2,
                  }}
                >
                  {character.house}
                </TableCell>
                <TableCell key="playsQuidditch">
                  {character.playsQuidditch ? <CheckCircle color="success" /> : <Cancel color="error" />}
                </TableCell>
                <TableCell key="position">
                  {character.position}
                </TableCell>
                <TableCell key="quidditchYears">
                  {character.quidditchYears.join(' ')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default CharacterPage;
