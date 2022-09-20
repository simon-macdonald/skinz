import React from 'react';
import {
  Box, Card, CardActionArea, CardContent, CardMedia, Grid, Typography,
} from '@mui/material';
import { clickChamp, selectDisplay } from './displaySlice';
import { useAppDispatch, useAppSelector } from '../glue/hooks';
import { selectSkinLines, SkinLineItem } from '../skins/skinLineSlice';
import { selectChampions } from '../champions/championSlice';
import { selectSkins } from '../skins/skinSlice';
import getAssetUrl from '../urls';

export interface GridItemSizes {
  xs: number,
  sm: number,
  md: number,
  lg: number,
  xl: number,
}

const PortraitCard = (props: { id: number, sizes: GridItemSizes }) => {
  const champions = useAppSelector(selectChampions);
  const skinLines = useAppSelector(selectSkinLines);
  const skins = useAppSelector(selectSkins);

  const champs = useAppSelector(selectDisplay);
  const dispatch = useAppDispatch();

  const { id, sizes } = props;
  const champion = champions.entities[id]!;
  const skinLine: SkinLineItem | null
    = champs.hoverSkinLine === 0
      ? null
      : skinLines.entities[champs.hoverSkinLine]!;

  return (
    <Grid item xs={sizes.xs} sm={sizes.sm} md={sizes.md} lg={sizes.lg} xl={sizes.xl}>
      <Card>
        <CardActionArea onClick={() => {
          dispatch(clickChamp(id));
        }}
        >
          <CardMedia
            component="img"
            image={skinLine === null ? getAssetUrl(champion.squarePortraitPath)
              : Object.keys(skinLine.skins).includes(id.toString()) ? getAssetUrl(skins.entities[skinLine.skins[id]]!.tilePath)
                : getAssetUrl(champion.squarePortraitPath)}
            alt={champion.name}
          />
          <CardContent sx={{
            bgcolor: Object.keys(skinLines.entities[champs.hoverSkinLine]!.skins).includes(id.toString()) ? 'secondary.main' : champs.champions.includes(id) ? 'primary.main' : 'transparent',
          }}
          >
            <Typography component="div" noWrap align="center">
              <Box sx={{
                fontWeight: 'bold',
                textTransform: 'capitalize',
              }}
              >
                {id === -1 ? 'Clear' : champions.entities[id]!.name}
              </Box>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default PortraitCard;
