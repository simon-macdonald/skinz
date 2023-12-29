import React, { useState } from 'react';
import {
  Box, Card, CardActionArea, CardContent, CardMedia, Grid, Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import getAssetUrl from '../urls';
import chromaNames from './chromaNames.json';

export type DisplayText = 'chromaName' | 'skinName';

const ChromaCard = (props: {
  skinName: string,
  chromaPath: string,
  skinLineId: number,
  color: string,
  displayText: DisplayText,
}) => {
  const {
    skinName, chromaPath, skinLineId, color, displayText,
  } = props;

  const navigate = useNavigate();

  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const colorName = chromaNames[color as keyof typeof chromaNames];
  const cardContent = displayText === 'chromaName' ? colorName : skinName;

  return (
    <Grid item xs={1}>
      <Card sx={{visibility: imageLoaded ? 'visible' : 'hidden'}}>
        <CardActionArea onClick={() => {
          if (skinLineId) {
            navigate(`/skinLines/${skinLineId}/colors/${color}`);
          }
        }}
        >
          <CardMedia
            component="img"
            image={getAssetUrl(chromaPath)}
            onLoad={handleImageLoad}
          />
          <CardContent>
            <Typography component="div" noWrap align="center">
              <Box sx={{
                fontWeight: 'bold',
                textTransform: 'capitalize',
              }}
              >
                {cardContent}
              </Box>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default ChromaCard;
