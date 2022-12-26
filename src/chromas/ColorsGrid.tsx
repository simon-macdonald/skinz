import { Avatar, Grid } from '@mui/material';
import React from 'react';
import { SkinLineItem } from '../skins/skinLineSlice';
import chromaNames from './chromaNames.json';

const ColorsGrid = (props: { skinLine: SkinLineItem }) => {
  const { skinLine } = props;

  return (
    <Grid container spacing={5} columns={5}>
      {skinLine.colors.map((color) => (
        <Grid item xs={1}>
          <Avatar sx={{
            backgroundImage: `linear-gradient(to right, #${color.split('_')[0]}, #${color.split('_')[1]})`,
          }}
          >
            {chromaNames[color as keyof typeof chromaNames][0]}
          </Avatar>
        </Grid>
      ))}
    </Grid>
  );
};

export default ColorsGrid;
