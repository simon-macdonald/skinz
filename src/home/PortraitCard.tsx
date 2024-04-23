import {
  Box, Card, CardActionArea, CardContent, CardMedia, Grid, Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { ChampionItem, selectChampions } from '../champions/championSlice';
import { useAppDispatch, useAppSelector } from '../glue/hooks';
import { selectSkinLines, SkinLineItem } from '../skinlines/skinLineSlice';
import { selectSkinLineIdAndChampionIdToSkinIdBiMap } from '../skins/selectors';
import { selectSkins } from '../skins/skinSlice';
import getAssetUrl, { getChampionTileUrl } from '../urls';
import { clickChamp, selectDisplay } from './displaySlice';

export interface GridItemSizes {
  xs: number,
  sm: number,
  md: number,
  lg: number,
  xl: number,
}

const getChampionImage = (champion: ChampionItem) => (champion.id !== -1 ? getChampionTileUrl(champion.id) : getAssetUrl(champion.squarePortraitPath));

const getChampionText = (champion: ChampionItem, display?: boolean) => (display ? 'Click a Champ' : 'Clear');

const PortraitCard = (props: { id: number, sizes: GridItemSizes, display?: boolean, setFindChampion?: React.Dispatch<React.SetStateAction<string>> }) => {
  const champions = useAppSelector(selectChampions);
  const skinLines = useAppSelector(selectSkinLines);
  const skinIds = useAppSelector(selectSkinLineIdAndChampionIdToSkinIdBiMap);
  const skins = useAppSelector(selectSkins);

  const champs = useAppSelector(selectDisplay);
  const dispatch = useAppDispatch();

  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const {
    id, sizes, display, setFindChampion,
  } = props;
  const champion = champions.entities[id]!;
  const skinLine: SkinLineItem | null
    = champs.hoverSkinLine === 0
      ? null
      : skinLines.entities[champs.hoverSkinLine]!;

  const skinLineSkins = skinLines.entities[champs.hoverSkinLine];
  const skinLineSkinsIncludesChampion =
    skinLineSkins &&
    skinIds[skinLineSkins.id] &&
    Object.keys(skinIds[skinLineSkins.id]).includes(id.toString());

  const bgColor = (skinLineSkins && (skinLineSkinsIncludesChampion
    ? 'secondary.main'
    : champs.champions.includes(id)
      ? 'primary.main'
      : 'transparent')) || 'transparent';

  const isChampionSelectionRow = display && id === -1;

  return (
    <Grid item xs={sizes.xs} sm={sizes.sm} md={sizes.md} lg={sizes.lg} xl={sizes.xl}>
      {champion && (
        <Card sx={{
          visibility: imageLoaded ? 'visible' : 'hidden',
          border: isChampionSelectionRow ? '1px dashed grey' : '',
        }}
        >
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
              image={skinLine === null ? getChampionImage(champion)
                : skinLineSkinsIncludesChampion ? getAssetUrl(skins.entities[skinIds[skinLine.id][id]]!.tilePath)
                  : getChampionImage(champion)}
              alt={champion.name}
              onLoad={handleImageLoad}
              sx={{
                visibility: isChampionSelectionRow ? 'hidden' : 'visible',
              }}
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
        </Card>
      )}
    </Grid>
  );
};

export default PortraitCard;
