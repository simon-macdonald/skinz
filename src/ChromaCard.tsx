import React from 'react';
import {
  Box, Card, CardContent, CardMedia, Grid, Typography,
} from '@mui/material';
import { getAssetUrl } from './urls';

const ChromaCard = (props: { name: string, chromaPath: string, }) => {
  const { name, chromaPath } = props;

  return (
    <Grid item xs={1}>
      <Card>
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
              {name}
            </Box>
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ChromaCard;
