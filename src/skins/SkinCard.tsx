import React from 'react';
import {
  Card, CardActionArea, CardContent, CardMedia, Grid, Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../glue/hooks';
import { selectSkins } from './skinSlice';

const SkinCard = (props: any) => {
  const { id } = props;

  const skins = useAppSelector(selectSkins);
  const skin = skins.entities[+id!]!;

  const navigate = useNavigate();

  return (
    <Grid item xs={1}>
      <Card>
        <CardActionArea onClick={() => navigate(`/skins/${id}`)}>
          <CardMedia
            component="img"
            image={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/${skin.splashPath.replace('/lol-game-data/assets/', '')}`}
          />
          <CardContent>
            <Typography
              component="div"
              noWrap
              align="center"
              sx={skin.chromas ? {
                fontWeight: 'bold',
                backgroundImage: 'linear-gradient(to left, violet, indigo, blue, green, yellow, orange, red)',
                webkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              } : { fontWeight: 'bold' }}
            >
              {skin.name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default SkinCard;
