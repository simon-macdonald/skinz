import React from 'react';
import {
  Box, Card, CardActionArea, CardContent, CardMedia, Grid, Typography,
} from '@mui/material';
import { clickChamp, selectChosenChampions } from './chosenChampionsSlice';
import { useAppDispatch, useAppSelector } from '../glue/hooks';
import { selectSkinLines, SkinLineItem } from '../skins/skinLineSlice';
import { selectChampions } from '../champions/championSlice';
import { selectSkins } from '../skins/skinSlice';
import { getAssetUrl } from '../urls';

const PortraitCard = (props: { id: number }) => {
  const champions = useAppSelector(selectChampions);
  const skinLines = useAppSelector(selectSkinLines);
  const skins = useAppSelector(selectSkins);

  const champs = useAppSelector(selectChosenChampions);
  const dispatch = useAppDispatch();

  const { id } = props;
  const champion = champions.entities[id]!;
  const skinLine: SkinLineItem | null
    = champs.hoverSkinLine === 0
      ? null
      : skinLines.entities[champs.hoverSkinLine]!;

  return (
    <Grid item xs={30} sm={20} md={12} lg={10} xl={6}>
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
