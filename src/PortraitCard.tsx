import React from 'react';
import {
  Box, Card, CardActionArea, CardContent, CardMedia, Grid, Typography,
} from '@mui/material';
import { clickChampion, selectChosenChampions } from './champions/chosenChampionsSlice';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { selectSkinLines, SkinLineItem } from './store/skinLineSlice';
import { selectChampions } from './store/championSlice';
import { selectSkins } from './store/skinSlice';
import { getAssetUrl } from './urls';

const PortraitCard = (props: any) => {
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
        <CardActionArea onClick={() => { dispatch(clickChampion(id)); }}>
          <CardMedia
            component="img"
            image={skinLine === null ? getAssetUrl(champion.squarePortraitPath)
              : skinLine.champions.includes(id) ? getAssetUrl(skins.entities[skinLine.skins[skinLine.champions.indexOf(id)]]!.tilePath)
                : getAssetUrl(champion.squarePortraitPath)}
            alt={champion.name}
          />
          <CardContent sx={{
            bgcolor: skinLines.entities[champs.hoverSkinLine]?.champions.includes(id) ? 'secondary.main' : champs.champions.includes(id) || skinLines.entities[champs.hoverSkinLine]?.champions.includes(id) ? 'primary.main' : 'transparent',
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
