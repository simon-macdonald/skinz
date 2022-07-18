import {
  Avatar,
  Container, Grid, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, Paper, Toolbar, Typography,
} from '@mui/material';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { championApi } from './champions/champions';
import ChromaCard from './ChromaCard';
import SkinCard from './SkinCard';
import { useAppSelector } from './store/hooks';
import { selectChampions } from './store/championSlice';

const ChromaPage = () => {
  const { id } = useParams();

  const skins = useAppSelector(championApi.endpoints.getSkins.select(''));
  const champions = useAppSelector(selectChampions);
  const champion = champions.entities[Math.floor(+id! / 1000)]!;

  return (
    <Container>
      <Toolbar>
        {}
      </Toolbar>
      <Typography variant="h2">
        {skins.data!.entities[+id!]!.name}
      </Typography>
      <Grid container spacing={5} columns={3}>
        <SkinCard id={skins.data!.entities[+id!]!.id} />
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
        {skins.data!.entities[+id!]!.chromas && skins.data!.entities[+id!]!.chromas
          .map((chroma) => (
            <ChromaCard name={chroma.name} chromaPath={chroma.chromaPath} key={chroma.id} />
          ))}
      </Grid>
    </Container>
  );
};

export default ChromaPage;
