import React from 'react';
import {
  Box, Card, CardActionArea, CardContent, CardMedia, Grid, Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import getAssetUrl from '../urls';
import chromaNames from './chromaNames.json';

const ChromaCard = (props: { name: string, chromaPath: string, skinLineId: number, color: string, }) => {
  const {
    name, chromaPath, skinLineId, color,
  } = props;

  const navigate = useNavigate();

  return (
    <Grid item xs={1}>
      <Card>
        <CardActionArea onClick={() => {
          if (skinLineId) {
            navigate(`/skinLines/${skinLineId}/colors/${color}`);
          }
        }}
        >
          <CardMedia
            component="img"
            image={getAssetUrl(chromaPath)}
          />
          <CardContent>
            <Typography component="div" noWrap align="center">
              <Box sx={{
                fontWeight: 'bold',
                textTransform: 'capitalize',
              }}
              >
                {`${name} (${chromaNames[color as keyof typeof chromaNames]})`}
              </Box>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default ChromaCard;
