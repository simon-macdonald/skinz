import React, { useState } from 'react';
import './App.css';
import {
  Card, CardActions, CardMedia, Chip, Container, Drawer, Grid, Typography,
} from '@mui/material';
import SkinThemeSet from './SkinThemeSet';
import {
  useGetChampionSummaryQuery,
  useGetSkinLinesQuery,
  useGetSkinsQuery,
} from './champions/champions';
import { useAppDispatch, useAppSelector } from './hooks';
import { selectTitle, setTitle } from './champions/championSlice';

function findThemes(champions: string[], skinLines: any, skins: any, championsHook: any) {
  if (champions.length === 0
    || skinLines.error
    || skinLines.isLoading
    || !skinLines.data
    || skins.error
    || skins.isLoading
    || !skins.data
    || championsHook.error
    || championsHook.isLoading
    || !championsHook.data) {
    return [];
  }

  const answers1: string[] = [];
  skinLines.data.ids.forEach((k: number) => {
    const champs = skinLines.data.entities[k].champions
      .map((id: string) => championsHook.data.entities[id].name);
    let allIn = true;
    champions.forEach((c) => {
      if (!champs || !champs.includes(c)) {
        allIn = false;
      }
    });
    if (allIn) {
      answers1.push(skinLines.data.entities[k].id);
    }
  });
  return answers1;
}

const buttonEnabled = (champion: string, themes: string[], skinLines: any, championsHook: any) => {
  if (skinLines.error
    || skinLines.isLoading
    || !skinLines.data
    || championsHook.error
    || championsHook.isLoading
    || !championsHook.data) {
    return true;
  }

  if (themes.length === 0) {
    return true;
  }
  let found = false;
  themes.forEach((theme) => {
    skinLines.data.entities[theme].champions.forEach((c: number) => {
      if (champion === championsHook.data.entities[c].name) {
        found = true;
      }
    });
  });
  return found;
};

const App = () => {
  const [champs, setChamps] = useState<string[]>([]);
  // const [id, setId] = useState<number>(1);
  // const { data, error, isLoading } = useGetChampionByIdQuery(id);

  const skins = useGetSkinsQuery('');
  const skinLines = useGetSkinLinesQuery('', { skip: !skins.isSuccess });

  const champions = useGetChampionSummaryQuery('');
  const championSummaryData = champions.data;
  const championSummaryError = champions.error;
  const championSummaryIsLoading = champions.isLoading;

  const title = useAppSelector(selectTitle);
  const dispatch = useAppDispatch();

  return (
    <Container maxWidth="xl">
      {`Latest Pick: ${title}`}
      <Grid container spacing={2} columns={60}>
        {championSummaryError ? (
          <>Oh no, there was an error</>
        ) : championSummaryIsLoading ? (
          <>Loading...</>
        ) : championSummaryData ? (
          championSummaryData.ids
            .filter((id) => id > 0)
            .filter((id) => champs.includes(championSummaryData.entities[id]!.name)
              || (!champs.includes(championSummaryData.entities[id]!.name)
                && buttonEnabled(
                  championSummaryData.entities[id]!.name,
                  findThemes(champs, skinLines, skins, champions),
                  skinLines,
                  champions,
                )))
            .map((id) => (
              <Grid item xs={15} sm={10} md={6} lg={5} xl={4}>
                <Card>
                  <CardMedia
                    component="img"
                    image={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/${championSummaryData.entities[id]!.squarePortraitPath.replace('/lol-game-data/assets/', '')}`}
                    alt={championSummaryData.entities[id]!.name}
                  />
                  <CardActions>
                    {champs.includes(championSummaryData.entities[id]!.name)
                  && (
                  <Chip
                    label={championSummaryData.entities[id]!.name}
                    color="primary"
                    onDelete={() => setChamps(
                      champs.filter((c) => c !== championSummaryData.entities[id]!.name),
                    )}
                  />
                  )}
                    {(!champs.includes(championSummaryData.entities[id]!.name)
                      && buttonEnabled(
                        championSummaryData.entities[id]!.name,
                        findThemes(champs, skinLines, skins, champions),
                        skinLines,
                        champions,
                      ))
                  && (
                    <Chip
                      label={championSummaryData.entities[id]!.name}
                      color="primary"
                      variant="outlined"
                      onClick={() => {
                        setChamps([...champs, championSummaryData.entities[id]!.name]);
                        dispatch(setTitle(championSummaryData.entities[id]!.name));
                        // setId(2);
                      }}
                    />
                  )}
                  </CardActions>
                </Card>
              </Grid>
            ))) : null}
      </Grid>
      <Drawer
        sx={{
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        {findThemes(champs, skinLines, skins, champions)
          .map((theme) => <SkinThemeSet theme={theme} />)}
      </Drawer>
      <Drawer
        sx={{
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="right"
      >
        {champs.map((c) => <Typography>{c}</Typography>)}
      </Drawer>
    </Container>
  );
};

export default App;
