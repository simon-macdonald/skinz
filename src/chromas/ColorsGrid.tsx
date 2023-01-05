import {
  Avatar, Grid, Tooltip, Typography,
} from '@mui/material';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SkinLineItem } from '../skins/skinLineSlice';
import { maybeGetChromaName } from './colorSlice';

const ColorsGrid = (props: { skinLine: SkinLineItem }) => {
  const { skinLine } = props;

  if (skinLine.colors.length === 0) {
    return (
      <Typography variant="h5">
        No chromas.
      </Typography>
    );
  }

  const { pathname } = useLocation();

  return (
    <>
      <Typography variant="h5">
        Chromas:
      </Typography>
      <Grid container spacing={5} columns={5}>
        {skinLine.colors.map((color) => (
          <Grid item xs={1}>
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
