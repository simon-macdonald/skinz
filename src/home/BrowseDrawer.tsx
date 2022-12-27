import React from 'react';
import '../glue/App.css';
import {
  Box,
  Drawer, Tab, Tabs, Toolbar, Typography,
} from '@mui/material';
import SkinLineHoverLink from '../skins/SkinLineHoverLink';
import { useAppDispatch, useAppSelector } from '../glue/hooks';
import {
  clickChamp,
  clickTab,
  selectDisplay,
} from './displaySlice';
import { selectSkinLines } from '../skins/skinLineSlice';
import { selectColors } from '../chromas/colorSlice';
import ColorHoverLink from '../chromas/ColorHoverLink';

interface TabPanelProps {
  children: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const {
    children, value, index,
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const BrowseDrawer = () => {
  const dispatch = useAppDispatch();

  const skinLines = useAppSelector(selectSkinLines);
  const colors = useAppSelector(selectColors);
  const display = useAppSelector(selectDisplay);

  const skinLinesDisplayed = display.skinLines.length === 0 ? skinLines.ids : display.skinLines;
  const colorsDisplayed = display.colors.length === 0 ? colors.ids : display.colors;

  // TODO move this to redux
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    dispatch(clickTab(newValue));
    dispatch(clickChamp(-1));
  };

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
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Skin Lines" />
            <Tab label="Colors" />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          {skinLinesDisplayed.map((skinLine) => <SkinLineHoverLink theme={skinLine} key={skinLine} />)}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {colorsDisplayed.map((color) => <ColorHoverLink theme={color} key={color} />)}
        </TabPanel>
      </Box>
    </Drawer>
  );
};

export default BrowseDrawer;
