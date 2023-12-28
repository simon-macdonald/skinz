import React from 'react';
import {
  Box, Card, CardActionArea, CardContent, CardMedia, Grid, Skeleton, Typography,
} from '@mui/material';
import { clickChamp, selectDisplay } from './displaySlice';
import { useAppDispatch, useAppSelector } from '../glue/hooks';
import { selectSkinLines, SkinLineItem } from '../skins/skinLineSlice';
import { ChampionItem, selectChampions } from '../champions/championSlice';
import { selectSkins } from '../skins/skinSlice';
import getAssetUrl, { getChampionTileUrl } from '../urls';
import { selectSkinIdAndChampionIdToSkinIdBiMap } from '../skins/selectors';

export interface GridItemSizes {
  xs: number,
  sm: number,
  md: number,
  lg: number,
  xl: number,
}

const getChampionImage = (champion: ChampionItem, display?: boolean) => (display && champion.id !== -1 ? getChampionTileUrl(champion.id) : getAssetUrl(champion.squarePortraitPath));

const getChampionText = (champion: ChampionItem, display?: boolean) => (display ? 'Champion Selection' : 'Clear');

const PortraitCard = (props: { id: number, sizes: GridItemSizes, display?: boolean, setFindChampion?: React.Dispatch<React.SetStateAction<string>> }) => {
  const champions = useAppSelector(selectChampions);
  const skinLines = useAppSelector(selectSkinLines);
  const skinIds = useAppSelector(selectSkinIdAndChampionIdToSkinIdBiMap);
  const skins = useAppSelector(selectSkins);

  const champs = useAppSelector(selectDisplay);
  const dispatch = useAppDispatch();

  const {
    id, sizes, display, setFindChampion,
  } = props;
  const champion = champions.entities[id]!;
  const skeleton = !champion ? <Skeleton variant="rounded" /> : null;
  const skinLine: SkinLineItem | null
    = champs.hoverSkinLine === 0
      ? null
      : skinLines.entities[champs.hoverSkinLine]!;

  const skinLineSkins = skinLines.entities[champs.hoverSkinLine];
  const skinLineSkinsIncludesChampion =
    skinLineSkins &&
    skinIds[skinLineSkins.id] &&
    Object.keys(skinIds[skinLineSkins.id]).includes(id.toString());
  
  const bgColor = skinLineSkins && (skinLineSkinsIncludesChampion
      ? 'secondary.main'
      : champs.champions.includes(id)
        ? 'primary.main'
        : 'transparent') || 'transparent';
  
  return (
    <Grid item xs={sizes.xs} sm={sizes.sm} md={sizes.md} lg={sizes.lg} xl={sizes.xl}>
      {skeleton || (
        <Card>
          <CardActionArea
            disabled={(display && id === -1) || skinLines.loading !== 'fulfilled'}
            onClick={() => {
              dispatch(clickChamp(id));
              if (setFindChampion) {
                setFindChampion('');
              }
            }}
          >
            <CardMedia
              component="img"
              image={skinLine === null ? getChampionImage(champion, display)
                : skinLineSkinsIncludesChampion ? getAssetUrl(skins.entities[skinIds[skinLine.id][id]]!.tilePath)
                  : getChampionImage(champion)}
              alt={champion.name}
            />
            <CardContent sx={{
              bgcolor: bgColor,
            }}
            >
              <Typography component="div" noWrap align="center">
                <Box sx={{
                  fontWeight: 'bold',
                  textTransform: 'capitalize',
                }}
                >
                  {id === -1 ? getChampionText(champion, display) : skinLine === null ? champions.entities[id]!.name : skinLineSkinsIncludesChampion ? skins.entities[skinIds[skinLine.id][id]]!.name : champions.entities[id]!.name}
                </Box>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>)}
    </Grid>
  );
};

export default PortraitCard;
