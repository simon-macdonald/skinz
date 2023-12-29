import {
  Avatar, Grid, Tooltip, Typography,
} from '@mui/material';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../glue/hooks';
import { selectSkinLineToColorsMap } from '../skinlines/skinLineSelectors';
import { SkinLineItem } from '../skinlines/skinLineSlice';
import chromaNames from './chromaNames.json';

const maybeGetChromaName = (color: string) => chromaNames[color as keyof typeof chromaNames];

const ColorsGrid = (props: { skinLine: SkinLineItem | undefined }) => {
  const { skinLine } = props;

  const skinLineColors = useAppSelector(selectSkinLineToColorsMap);

  const { pathname } = useLocation();

  if (!skinLine || !(skinLine.id in skinLineColors)) {
    return (
      <Typography variant="h5">
        No chromas.
      </Typography>
    );
  }

  return (
    <>
      <Typography variant="h5">
        Chromas:
      </Typography>
      <Grid container spacing={5} columns={5}>
        {skinLineColors[skinLine.id].map((color) => (
          <Grid key={color} item xs={1}>
            <Tooltip title={(
              <Typography>
                {maybeGetChromaName(color)}
              </Typography>
            )}
            >
              <Link
                to={`/skinLines/${skinLine.id}/colors/${color}`}
                className="button muted-button"
                style={{
                  textDecoration: 'none',
                }}
              >
                <Avatar
                  variant={pathname.includes(color) ? 'rounded' : 'circular'}
                  sx={{
                    backgroundImage: `linear-gradient(to right, #${color.split('_')[0]}, #${color.split('_')[1]})`,
                  }}
                >
                  {(maybeGetChromaName(color) && maybeGetChromaName(color)[0]) || '?'}
                </Avatar>
              </Link>
            </Tooltip>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ColorsGrid;
