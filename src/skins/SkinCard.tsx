import React, { useState } from 'react';
import {
  Card, CardActionArea, CardContent, CardMedia, Grid, Typography, useMediaQuery,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  blue, green, indigo, orange, purple, red, yellow,
} from '@mui/material/colors';
import { useAppSelector } from '../glue/hooks';
import { selectSkins } from './skinSlice';
import getAssetUrl from '../urls';

const SkinCard = (props: any) => {
  const { id } = props;

  const skins = useAppSelector(selectSkins);
  const skin = skins.entities[+id!]!;

  const navigate = useNavigate();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const rainbowShade = prefersDarkMode ? 200 : 900;

  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <Grid item xs={1}>
      <Card sx={{visibility: imageLoaded ? 'visible' : 'hidden'}}>
        <CardActionArea onClick={() => navigate(`/skins/${id}`)}>
          <CardMedia
            component="img"
            image={getAssetUrl(skin.tilePath)}
            onLoad={handleImageLoad}
          />
          <CardContent>
            <Typography
              component="div"
              noWrap
              align="center"
              sx={skin.chromas ? {
                fontWeight: 'bold',
                backgroundImage: `linear-gradient(to left, ${[red, orange, yellow, green, blue, indigo, purple].map((color) => color[rainbowShade]).join(', ')})`,
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
