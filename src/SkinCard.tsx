import React from 'react';
import {
  Avatar,
  Badge,
  Box, Card, CardActionArea, CardContent, CardMedia, Grid, Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from './store/hooks';
import { selectSkins } from './store/skinSlice';

const SkinCard = (props: any) => {
  const { id } = props;

  const skins = useAppSelector(selectSkins);
  const skin = skins.entities[+id!]!;

  const navigate = useNavigate();

  return (
    <Grid item xs={1}>
      <Badge
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        badgeContent={
          skin.chromas
            ? <Avatar sx={{ width: 24, height: 24 }} src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-champ-select/global/default/images/config/button-chroma.png" />
            : null
        }
      >
        <Card>
          <CardActionArea onClick={() => navigate(`/skins/${id}`)}>
            <CardMedia
              component="img"
              image={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/${skin.splashPath.replace('/lol-game-data/assets/', '')}`}
            />
            <CardContent>
              <Typography component="div" noWrap align="center">
                <Box sx={{
                  fontWeight: 'bold',
                  textTransform: 'capitalize',
                }}
                >
                  {skin.name}
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
