import React from 'react';
import '../glue/App.css';
import {
  Drawer, Toolbar,
} from '@mui/material';
import SkinLineHoverLink from '../skins/SkinLineHoverLink';
import { useAppSelector } from '../glue/hooks';
import {
  selectDisplay,
} from './displaySlice';
import { selectSkinLines } from '../skins/skinLineSlice';

const BrowseDrawer = () => {
  const skinLines = useAppSelector(selectSkinLines);
  const display = useAppSelector(selectDisplay);

  const skinLinesDisplayed = display.skinLines.length === 0 ? skinLines.ids : display.skinLines;

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
      {skinLinesDisplayed.map((skinLine) => <SkinLineHoverLink theme={skinLine} key={skinLine} />)}
    </Drawer>
  );
};

export default BrowseDrawer;
