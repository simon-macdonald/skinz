import {
  Box,
  Popover, Typography, useMediaQuery,
} from '@mui/material';
import {
  blue, green, indigo, orange, purple, red, yellow,
} from '@mui/material/colors';
import { EntityId } from '@reduxjs/toolkit';
import React from 'react';
import { Link } from 'react-router-dom';
import { selectChampions } from '../champions/championSlice';
import { useAppDispatch, useAppSelector } from '../glue/hooks';
import { hoverAway, hoverOver } from '../home/displaySlice';
import { selectSkinLineIdAndChampionIdToSkinIdBiMap } from '../skins/selectors';
import { selectSkins, SkinItem } from '../skins/skinSlice';
import { selectSkinLines } from './skinLineSlice';

const SkinLineHoverLink = (props: { theme: EntityId }) => {
  const { theme } = props;

  const champions = useAppSelector(selectChampions);
  const skins = useAppSelector(selectSkins);
  const skinLines = useAppSelector(selectSkinLines);
  const skinIds = useAppSelector(selectSkinLineIdAndChampionIdToSkinIdBiMap);
  const skinLine = skinLines.entities[theme]!;

  const dispatch = useAppDispatch();

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const rainbowShade = prefersDarkMode ? 200 : 900;

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    dispatch(hoverOver(+theme));
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    dispatch(hoverAway());
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Link
        to={`/skinLines/${theme}`}
        className="button muted-button"
        onClick={() => {
          dispatch(hoverAway());
        }}
        style={{
          textDecoration: 'none',
        }}
      >
        <Typography
          aria-owns={open ? 'mouse-over-popover' : undefined}
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
          component="div"
          noWrap
          color={open ? 'secondary.main' : 'primary.main'}
        >
          <Box sx={{
            fontWeight: 'bold',
            textTransform: 'capitalize',
          }}
          >
            {skinLine.name}
          </Box>
        </Typography>
      </Link>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        {skinIds[skinLine.id] && Object
          .values(skinIds[skinLine.id])
          .map((skin) => skins.entities[skin]!)
          .sort((a, b) => {
            try {
              const deriveChampionId = (skin: SkinItem) => Math.floor(skin.id / 1000);
              const getChampName = (skin: SkinItem) => champions.entities[deriveChampionId(skin)]!.name;
              const championNameA = getChampName(a);
              const championNameB = getChampName(b);
              return championNameA.localeCompare(championNameB);
            } catch (championInfoTooOldSoDoAHardReload: any) {
              return -1;
            }
          })
          .map((skin) => (
            <Typography
              sx={skin.chromas ? {
                p: 1,
                fontWeight: 'bold',
                backgroundImage: `linear-gradient(to left, ${[red, orange, yellow, green, blue, indigo, purple].map((color) => color[rainbowShade]).join(', ')})`,
                webkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              } : {
                p: 1,
                fontWeight: 'bold',
              }}
              key={skin.name}
            >
              {skin.name}
            </Typography>
          ))}
      </Popover>
    </>
  );
};

export default SkinLineHoverLink;
