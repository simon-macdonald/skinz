import React from 'react';
import '../glue/App.css';
import {
  Drawer, Toolbar,
} from '@mui/material';
import SkinLineHoverLink from '../skins/SkinLineHoverLink';
import { useAppSelector } from '../glue/hooks';
import {
  FilterBy,
  selectDisplay,
} from './displaySlice';
import { selectColors } from '../chromas/colorSlice';
import ColorHoverLink from '../chromas/ColorHoverLink';
import { selectVisibleSkinLines } from './selectors';

const BrowseDrawer = (props: { filterBy: FilterBy }) => {
  const { filterBy } = props;

  const colors = useAppSelector(selectColors);
  const display = useAppSelector(selectDisplay);

  const visibleSkinLines = useAppSelector(selectVisibleSkinLines(display.champions));

  const colorsDisplayed = display.colors.length === 0 ? colors.ids : display.colors;
  const displayed = filterBy === 'skins' ? visibleSkinLines : colorsDisplayed;

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
      {displayed.map((entity) => (
        filterBy === 'skins' ?
          <SkinLineHoverLink theme={entity} key={entity} /> :
          <ColorHoverLink theme={entity} key={entity} />))}
    </Drawer>
  );
};

export default BrowseDrawer;
