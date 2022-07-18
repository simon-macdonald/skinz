import {
  Box,
  Popover, Typography,
} from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { hoverAway, hoverOver } from './champions/skinLineHoverSlice';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { selectSkinLines } from './store/skinLineSlice';
import { selectSkins } from './store/skinSlice';

const SkinThemeSet = (props: { theme: number }) => {
  const { theme } = props;

  // const skins = useAppSelector(championApi.endpoints.getSkins.select(''));
  // const skinLines = useAppSelector(championApi.endpoints.getSkinLines.select(''));
  const skins = useAppSelector(selectSkins);
  const skinLines = useAppSelector(selectSkinLines);
  const skinLine = skinLines.entities[theme]!;

  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    dispatch(hoverOver(theme));
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
        onClick={() => dispatch(hoverAway())}
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
        {skinLine.skins.map((skin) => skins.entities[skin]?.name).map((skinName) => <Typography sx={{ p: 1 }} key={skinName}>{skinName}</Typography>)}
      </Popover>
    </>
  );
};

export default SkinThemeSet;
