import React from 'react';
import {
  Box, Card, CardActionArea, CardContent, CardMedia, Grid, Typography,
} from '@mui/material';
import { clickChampion, selectChosenChampions } from './champions/chosenChampionsSlice';
import { selectSkinLineHover } from './champions/skinLineHoverSlice';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { selectSkinLines } from './store/skinLineSlice';
import { selectChampions } from './store/championSlice';
import { selectSkins } from './store/skinSlice';

const PortraitCard = (props: any) => {
  const champions = useAppSelector(selectChampions);
  const skinLines = useAppSelector(selectSkinLines);
  const skins = useAppSelector(selectSkins);

  const skinLineHover = useAppSelector(selectSkinLineHover);
  const champs = useAppSelector(selectChosenChampions);
  const dispatch = useAppDispatch();

  const { id } = props;

  return (
    <Grid item xs={30} sm={20} md={12} lg={10} xl={6}>
      <Card>
        <CardActionArea onClick={() => { dispatch(clickChampion(id)); }}>
          <CardMedia
            component="img"
            image={skinLineHover === 0 ? `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/${champions.entities[id]!.squarePortraitPath.replace('/lol-game-data/assets/', '')}`
              : skinLines.entities[skinLineHover]?.champions.includes(id) ? `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/${skins.entities[skinLines.entities[skinLineHover]!.skins[skinLines.entities[skinLineHover]!.champions.indexOf(id)]]!.tilePath.replace('/lol-game-data/assets/', '')}`
                : `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/${champions.entities[id]!.squarePortraitPath.replace('/lol-game-data/assets/', '')}`}
            alt={champions.entities[id]!.name}
          />
          <CardContent sx={{
            bgcolor: skinLines.entities[skinLineHover]?.champions.includes(id) ? 'secondary.main' : champs.champions.includes(id) || skinLines.entities[skinLineHover]?.champions.includes(id) ? 'primary.main' : 'transparent',
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
