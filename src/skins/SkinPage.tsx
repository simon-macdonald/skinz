import {
  Avatar,
  Container, Grid, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Toolbar, Typography,
} from '@mui/material';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import ChromaCard from '../chromas/ChromaCard';
import SkinCard from './SkinCard';
import { useAppSelector } from '../glue/hooks';
import { selectChampions } from '../champions/championSlice';
import { selectSkins } from './skinSlice';

const SkinPage = () => {
  const { id } = useParams();

  const skins = useAppSelector(selectSkins);
  const skin = skins.entities[+id!]!;

  const champions = useAppSelector(selectChampions);
  const champion = champions.entities[Math.floor(+id! / 1000)]!;

  return (
    <Container>
      <Toolbar>
        {}
      </Toolbar>
      <Typography variant="h2">
        {skin.name}
      </Typography>
      <Grid container spacing={5} columns={3}>
        <SkinCard id={skin.id} />
        <Grid item xs={2}>
          <List>
            <ListItem disablePadding button component={Link} to={`/champions/${champion.id}`}>
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/hextech-images/currency_champion.png" />
                </ListItemAvatar>
                <ListItemText primary={`Champion: ${champion.name}`} />
              </ListItemButton>
            </ListItem>
          </List>
        </Grid>
        {skin.chromas && skin.chromas
          .map((chroma) => (
            <ChromaCard
              name={chroma.name}
              chromaPath={chroma.chromaPath}
              skinLineId={skin.skinLines && skin.skinLines[0].id}
              color={(`${chroma.colors[0]}_${chroma.colors[1]}`).replaceAll('#', '')}
              key={chroma.id}
            />
          ))}
      </Grid>
    </Container>
  );
};

export default SkinPage;
