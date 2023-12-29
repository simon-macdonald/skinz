import {
  Container, Grid, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography,
} from '@mui/material';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import ChromaCard from '../chromas/ChromaCard';
import SkinCard from './SkinCard';
import { useAppSelector } from '../glue/hooks';
import { selectChampions } from '../champions/championSlice';
import { selectSkins } from './skinSlice';
import BrowseDrawer from '../home/BrowseDrawer';
import { selectSkinLines } from '../skinlines/skinLineSlice';

const SkinPage = () => {
  const { id } = useParams();

  const skins = useAppSelector(selectSkins);
  const skin = skins.entities[+id!];

  const skinLines = useAppSelector(selectSkinLines);

  const champions = useAppSelector(selectChampions);
  const champion = champions.entities[Math.floor(+id! / 1000)];

  return (
    <>
      <BrowseDrawer filterBy="skins" />
      <Container>
        <Toolbar>
          {}
        </Toolbar>
        <Typography variant="h3">
          {skin?.name || '...'}
        </Typography>
        <Grid container sx={{ marginTop: 0 }} spacing={5} columns={3}>
          {skin && <SkinCard id={skin.id} />}
          <Grid item xs={2}>
            <List>
              <ListItem key="champion" disablePadding button component={Link} to={`/champions/${champion?.id || '-1'}`}>
                <ListItemButton>
                  <ListItemText primary={`Champion: ${champion?.name || '...'}`} />
                </ListItemButton>
              </ListItem>
              {skin?.skinLines?.map((skinLine) => (
                <ListItem key={skinLine.id} disablePadding button component={Link} to={`/skinLines/${skinLine.id}`}>
                  <ListItemButton>
                    <ListItemText primary={`Skin Line: ${skinLines.entities[skinLine.id]?.name}`} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Grid>
          {skin?.chromas && skin.chromas
            .map((chroma) => (
              <ChromaCard
                skinName={chroma.name}
                chromaPath={chroma.chromaPath}
                skinLineId={(skin.skinLines && skin.skinLines.length > 0 && skin.skinLines[0].id) || -1}
                color={chroma.colorsKey}
                displayText="chromaName"
                key={chroma.id}
              />
            ))}
        </Grid>
      </Container>
    </>
  );
};

export default SkinPage;
