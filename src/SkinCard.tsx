import React from 'react';
import {
  Avatar,
  Badge,
  Box, Card, CardActionArea, CardContent, CardMedia, Grid, Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { championApi } from './champions/champions';
import { useAppSelector } from './store/hooks';

const SkinCard = (props: any) => {
  const skins = useAppSelector(championApi.endpoints.getSkins.select(''));

  const navigate = useNavigate();

  const { id } = props;

  return (
    <Grid item xs={6} sm={6} md={4} lg={3} xl={4}>
      <Badge
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        badgeContent={
          skins.data!.entities[+id!]!.chromas
            ? <Avatar sx={{ width: 24, height: 24 }} src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-champ-select/global/default/images/config/button-chroma.png" />
            : null
        }
      >
        <Card>
          <CardActionArea onClick={() => navigate(`/skins/${id}`)}>
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
          </CardActionArea>
        </Card>
      </Badge>
    </Grid>
  );
};

export default SkinCard;
