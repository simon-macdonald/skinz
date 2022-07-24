import {
  Box,
  Checkbox,
  Typography,
} from '@mui/material';
import { EntityId } from '@reduxjs/toolkit';
import React from 'react';
import { Link } from 'react-router-dom';
import { clickChamp, clickTab, selectChosenChampions } from '../home/chosenChampionsSlice';
import { selectColors } from './colorSlice';
import { useAppDispatch, useAppSelector } from '../glue/hooks';

const ColorHoverLink = (props: { theme: EntityId }) => {
  const { theme } = props;

  const dispatch = useAppDispatch();

  const colors = useAppSelector(selectColors);
  const color = colors.entities[theme]!;

  const champions = useAppSelector(selectChosenChampions);
  const championsUrlArg
    = champions.champions.length === 0
    ? '_'
    : champions.champions.join('_');

  return (
    <>
      <Link
        to={`/colors/${theme}/champions/${championsUrlArg}`}
        className="button muted-button"
        onClick={() => {
          dispatch(clickChamp(-1));
          dispatch(clickTab(0))
        }}
        style={{
          textDecoration: 'none',
        }}
      >
        <Typography
          component="div"
        >
          <Box sx={{
            fontWeight: 'bold',
            textTransform: 'capitalize',
            backgroundColor: '#' + color.id.split('_')[0],
          }}
          >
            {}
          </Box>
        </Typography>
      </Link>
      </>
  );
};

export default ColorHoverLink;
