import React from 'react';
import {
  Box, Card, CardContent, CardMedia, Grid, Typography,
} from '@mui/material';

const SkinCard = (props: { name: string, chromaPath: string, }) => {
  const { name, chromaPath } = props;

  return (
    <Grid item xs={6} sm={6} md={4} lg={3} xl={4}>
      <Card>
        <CardMedia
          component="img"
          image={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/${chromaPath.replace('/lol-game-data/assets/', '')}`}
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

export default SkinCard;
