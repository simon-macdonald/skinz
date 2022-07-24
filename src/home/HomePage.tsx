import React from 'react';
import '../glue/App.css';
import {
  Box,
  Container, Divider, Drawer, Grid, Tab, Tabs, Toolbar, Typography,
} from '@mui/material';
import SkinThemeSet from '../skins/SkinLineHoverLink';
import { useAppDispatch, useAppSelector } from '../glue/hooks';
import {
  clickChamp,
  clickTab,
  selectChosenChampions,
} from './chosenChampionsSlice';
import PortraitCard from './PortraitCard';
import { selectChampions } from '../champions/championSlice';
import { selectSkinLines } from '../skins/skinLineSlice';
import { selectColors } from '../chromas/colorSlice';
import ColorHoverLink from '../chromas/ColorHoverLink';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const HomePage = () => {
  const dispatch = useAppDispatch();

  const champions = useAppSelector(selectChampions);
  const skinLines = useAppSelector(selectSkinLines);
  const colors = useAppSelector(selectColors);
  const chosenChampions = useAppSelector(selectChosenChampions);

  const skinLinesDisplayed = chosenChampions.skinLines.length === 0 ? skinLines.ids : chosenChampions.skinLines;
  const colorsDisplayed = chosenChampions.colors.length === 0 ? colors.ids : chosenChampions.colors;

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    dispatch(clickTab(newValue));
    dispatch(clickChamp(-1));
  };

  return (
    <Container>
      <Toolbar>
        {}
      </Toolbar>
      <Grid container spacing={2} columns={60}>
        {champions.ids
          .filter((id) => id > 0)
          .filter((id) => chosenChampions.displays[+id] !== 'hidden')
          .map((id) => (
            <PortraitCard id={+id} key={id} />
          ))}
        {chosenChampions.champions.length > 0 && <PortraitCard id={-1} />}
      </Grid>
      <Typography variant="h5">
        skinz.lol isn&apos;t endorsed by Riot Games and doesn&apos;t reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot Games properties. Riot Games, and all associated properties are trademarks or registered trademarks of Riot Games, Inc.
      </Typography>
      <Drawer
        sx={{
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          {}
        </Toolbar>
        <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Skin Lines"  />
          <Tab label="Colors"  />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {skinLinesDisplayed.map((skinLine) => <SkinThemeSet theme={skinLine} key={skinLine} />)}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {colorsDisplayed.map((color) => <ColorHoverLink theme={color} key={color} />)}
      </TabPanel>
    </Box>
      </Drawer>
    </Container>
  );
};

export default HomePage;
