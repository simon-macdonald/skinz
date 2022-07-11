import React from 'react';
import {
  Box, Card, CardContent, CardMedia, Grid, Typography,
} from '@mui/material';
import { championApi } from './champions/champions';
import { useAppSelector } from './hooks';

const SkinCard = (props: any) => {
  const skins = useAppSelector(championApi.endpoints.getSkins.select(''));

  const { id } = props;

  return (
    <Grid item xs={6} sm={6} md={4} lg={3} xl={4}>
      <Card>
        <CardMedia
          component="img"
          image={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/${skins.data!.entities[id]!.splashPath.replace('/lol-game-data/assets/', '')}`}
        />
        <CardContent>
          <Typography component="div" noWrap align="center">
            <Box sx={{
              fontWeight: 'bold',
              textTransform: 'capitalize',
            }}
            >
              {skins.data!.entities[id]!.name}
            </Box>
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default SkinCard;
