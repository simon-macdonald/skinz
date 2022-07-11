import {
  Box,
  Popover, Typography,
} from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { championApi } from './champions/champions';
import { hoverAway, hoverOver } from './champions/skinLineHoverSlice';
import { useAppDispatch, useAppSelector } from './hooks';

const SkinThemeSet = (props: { theme: number }) => {
  const { theme } = props;

  const skins = useAppSelector(championApi.endpoints.getSkins.select(''));
  const skinLines = useAppSelector(championApi.endpoints.getSkinLines.select(''));

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
      <Typography
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        <Link to={`/skinLines/${theme}`} className="button muted-button" style={{
          textDecoration: 'none',
          // fontWeight: 'bold',
          // textTransform: 'capitalize',
          // textEmphasisColor: 'primary.main',
          color: 'primary.main',
        }}>
          <Typography component="div">
            <Box sx={{
              fontWeight: 'bold',
              textTransform: 'capitalize',
              textEmphasisColor: 'secondary.main',
            }}
            >
              {skinLines.data?.entities[theme]!.name}
            </Box>
          </Typography>
        </Link>
      </Typography>
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
        {skinLines.data?.entities[theme]?.skins.map((skin) => skins.data?.entities[skin]?.name).map((skinName) => <Typography sx={{ p: 1 }}>{skinName}</Typography>)}
      </Popover>
    </>
  );
};

export default SkinThemeSet;
