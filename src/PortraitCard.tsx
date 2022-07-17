import React from 'react';
import {
  Box, Card, CardActionArea, CardContent, CardMedia, Grid, Typography,
} from '@mui/material';
import { championApi } from './champions/champions';
import { clickChampion, selectChosenChampions } from './champions/chosenChampionsSlice';
import { selectSkinLineHover } from './champions/skinLineHoverSlice';
import { useAppDispatch, useAppSelector } from './store/hooks';

const PortraitCard = (props: any) => {
  const champions = useAppSelector(championApi.endpoints.getChampionSummary.select(''));
  const skins = useAppSelector(championApi.endpoints.getSkins.select(''));
  const skinLines = useAppSelector(championApi.endpoints.getSkinLines.select(''));

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
            image={skinLineHover === 0 ? `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/${champions.data!.entities[id]!.squarePortraitPath.replace('/lol-game-data/assets/', '')}`
              : skinLines.data!.entities[skinLineHover]?.champions.includes(id) ? `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/${skins.data!.entities[skinLines.data!.entities[skinLineHover]!.skins[skinLines.data!.entities[skinLineHover]!.champions.indexOf(id)]]!.tilePath.replace('/lol-game-data/assets/', '')}`
                : `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/${champions.data!.entities[id]!.squarePortraitPath.replace('/lol-game-data/assets/', '')}`}
            alt={champions.data!.entities[id]!.name}
          />
          <CardContent sx={{
            bgcolor: skinLines.data!.entities[skinLineHover]?.champions.includes(id) ? 'secondary.main' : champs.champions.includes(id) || skinLines.data!.entities[skinLineHover]?.champions.includes(id) ? 'primary.main' : 'transparent',
          }}
          >
            <Typography component="div" noWrap align="center">
              <Box sx={{
                fontWeight: 'bold',
                textTransform: 'capitalize',
              }}
              >
                {id === -1 ? 'Clear' : champions.data!.entities[id]!.name}
              </Box>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default PortraitCard;
