import React from 'react';
import {
  Drawer, Toolbar,
} from '@mui/material';
import SkinLineHoverLink from '../skinlines/SkinLineHoverLink';
import { useAppSelector } from '../glue/hooks';
import {
  FilterBy,
  selectDisplay,
} from './displaySlice';
import ColorHoverLink from '../chromas/ColorHoverLink';
import { selectVisibleSkinLines } from '../skinlines/skinLineSelectors';
import { selectVisibleColors } from '../chromas/colorSelectors';

const BrowseDrawer = (props: { filterBy: FilterBy }) => {
  const { filterBy } = props;

  const display = useAppSelector(selectDisplay);

  const visibleSkinLines = useAppSelector(selectVisibleSkinLines(display.champions));
  const visibleColors = useAppSelector(selectVisibleColors(display.champions));

  const displayed = filterBy === 'skins' ? visibleSkinLines : visibleColors;

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
