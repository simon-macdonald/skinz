import React from 'react';
import '../glue/App.css';
import {
  Box,
  Drawer, Toolbar,
} from '@mui/material';
import { useAppSelector } from '../glue/hooks';
import {
  selectDisplay,
} from './displaySlice';
import { selectColors } from '../chromas/colorSlice';
import ColorHoverLink from '../chromas/ColorHoverLink';

const BrowseDrawerChromas = () => {
  const colors = useAppSelector(selectColors);
  const display = useAppSelector(selectDisplay);

  const colorsDisplayed = display.colors.length === 0 ? colors.ids : display.colors;

  return (
    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar>
        {}
      </Toolbar>
      <Box sx={{ overflow: 'auto' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          Colors
        </Box>
        {colorsDisplayed.map((color) => <ColorHoverLink theme={color} key={color} />)}
      </Box>
    </Drawer>
  );
};

export default BrowseDrawerChromas;
