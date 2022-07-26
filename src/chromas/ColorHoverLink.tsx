import {
  Box,
  Typography,
} from '@mui/material';
import { EntityId } from '@reduxjs/toolkit';
import React from 'react';
import { Link } from 'react-router-dom';
import { selectDisplay } from '../home/displaySlice';
import { selectColors } from './colorSlice';
import { useAppSelector } from '../glue/hooks';

const ColorHoverLink = (props: { theme: EntityId }) => {
  const { theme } = props;

  const colors = useAppSelector(selectColors);
  const color = colors.entities[theme]!;

  const champions = useAppSelector(selectDisplay);
  const championsUrlArg
    = champions.champions.length === 0
      ? '_'
      : champions.champions.join('_');

  return (
    <Link
      to={`/colors/${theme}/champions/${championsUrlArg}`}
      className="button muted-button"
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
          backgroundImage: `linear-gradient(to right, #${color.id.split('_')[0]}, #${color.id.split('_')[1]})`,
        }}
        >
          &nbsp;
        </Box>
      </Typography>
    </Link>
  );
};

export default ColorHoverLink;
