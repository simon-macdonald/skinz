import { Popover, Typography } from '@mui/material';
import React from 'react';
import { championApi } from './champions/champions';
import { useAppSelector } from './hooks';

const SkinThemeSet = (props: { theme: string }) => {
  const champions = useAppSelector(championApi.endpoints.getChampionSummary.select(''));
  const skins = useAppSelector(championApi.endpoints.getSkins.select(''));
  const skinLines = useAppSelector(championApi.endpoints.getSkinLines.select(''));

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const { theme } = props;

  return (
    <>
      <Typography
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        {skinLines.data?.entities[theme]!.name}
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
        <Typography sx={{ p: 1 }}>{skinLines.data?.entities[theme]?.champions.map((champion) => champions.data?.entities[champion]?.name).join(' ')}</Typography>
      </Popover>
    </>
  );
};

export default SkinThemeSet;
