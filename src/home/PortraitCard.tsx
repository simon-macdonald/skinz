import React from 'react';
import {
  Box, Card, CardActionArea, CardContent, CardMedia, Grid, Typography,
} from '@mui/material';
import { clickChamp, selectDisplay } from './displaySlice';
import { useAppDispatch, useAppSelector } from '../glue/hooks';
import { selectSkinLines, SkinLineItem } from '../skins/skinLineSlice';
import { ChampionItem, selectChampions } from '../champions/championSlice';
import { selectSkins } from '../skins/skinSlice';
import getAssetUrl, { getChampionTileUrl } from '../urls';

export interface GridItemSizes {
  xs: number,
  sm: number,
  md: number,
  lg: number,
  xl: number,
}

const getChampionImage = (champion: ChampionItem, display?: boolean) => (display && champion.id !== -1 ? getChampionTileUrl(champion.id) : getAssetUrl(champion.squarePortraitPath));

const getChampionText = (champion: ChampionItem, display?: boolean) => (display ? 'Champion Selection' : 'Clear');

const PortraitCard = (props: { id: number, sizes: GridItemSizes, display?: boolean }) => {
  const champions = useAppSelector(selectChampions);
  const skinLines = useAppSelector(selectSkinLines);
  const skins = useAppSelector(selectSkins);

  const champs = useAppSelector(selectDisplay);
  const dispatch = useAppDispatch();

  const { id, sizes, display } = props;
  const champion = champions.entities[id]!;
  const skinLine: SkinLineItem | null
    = champs.hoverSkinLine === 0
      ? null
      : skinLines.entities[champs.hoverSkinLine]!;

  return (
    <Grid item xs={sizes.xs} sm={sizes.sm} md={sizes.md} lg={sizes.lg} xl={sizes.xl}>
      <Card>
        <CardActionArea
          disabled={display && id === -1}
          onClick={() => {
            dispatch(clickChamp(id));
          }}
        >
          <CardMedia
            component="img"
            image={skinLine === null ? getChampionImage(champion, display)
              : Object.keys(skinLine.skins).includes(id.toString()) ? getAssetUrl(skins.entities[skinLine.skins[id]]!.tilePath)
                : getChampionImage(champion)}
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
                {id === -1 ? getChampionText(champion, display) : skinLine === null ? champions.entities[id]!.name : Object.keys(skinLine.skins).includes(id.toString()) ? skins.entities[skinLine.skins[id]]!.name : champions.entities[id]!.name}
              </Box>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default PortraitCard;
