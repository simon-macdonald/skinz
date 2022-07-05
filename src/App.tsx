import React from 'react';
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
import { selectTitle } from './champions/championSlice';
import { clickChampion, selectChosenChampions } from './champions/chosenChampionsSlice';

function findThemes(champions: number[], skinLines: any, skins: any, championsHook: any) {
  if (champions.length === 0) {
    return [];
  }

  const answers1: string[] = [];
  skinLines.data.ids.forEach((k: number) => {
    const champs = skinLines.data.entities[k].champions;
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

const buttonEnabled = (
  championId: number,
  themes: string[],
  skinLines: any,
) => {
  if (themes.length === 0) {
    return true;
  }
  let found = false;
  themes.forEach((theme) => {
    skinLines.data.entities[theme].champions.forEach((c: number) => {
      if (championId === c) {
        found = true;
      }
    });
  });
  return found;
};

const App = () => {
  const champions = useGetChampionSummaryQuery('');
  const skins = useGetSkinsQuery('');
  const skinLines = useGetSkinLinesQuery('', { skip: !skins.isSuccess });

  const title = useAppSelector(selectTitle);
  const champs = useAppSelector(selectChosenChampions);
  const dispatch = useAppDispatch();

  if (skinLines.error
    || skinLines.isLoading
    || !skinLines.data
    || skins.error
    || skins.isLoading
    || !skins.data
    || champions.error
    || champions.isLoading
    || !champions.data) {
    return <Typography>Loading</Typography>;
  }

  return (
    <Container>
      <Grid container spacing={2} columns={60}>
        {champions.data.ids
          .filter((id) => id > 0)
          .filter((id) => champs.champions.includes(id as number)
              || buttonEnabled(
                id as number,
                findThemes(champs.champions, skinLines, skins, champions),
                skinLines,
              ))
          .map((id) => (
            <Grid item xs={15} sm={10} md={6} lg={5} xl={4}>
              <Card>
                <CardMedia
                  component="img"
                  image={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/${champions.data.entities[id]!.squarePortraitPath.replace('/lol-game-data/assets/', '')}`}
                  alt={champions.data.entities[id]!.name}
                />
                <CardActions>
                  <Chip
                    label={champions.data.entities[id]!.name}
                    color="primary"
                    variant={champs.champions.includes(id as number) ? 'filled' : 'outlined'}
                    onClick={() => {
                      dispatch(clickChampion(id as number));
                    }}
                  />
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
      skinz.lol isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot Games properties. Riot Games, and all associated properties are trademarks or registered trademarks of Riot Games, Inc.
      {false && `Latest Pick: ${title}`}
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
        {findThemes(champs.champions, skinLines, skins, champions).map((theme) => <SkinThemeSet theme={theme} />)}
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
        {champs.champions.map((c) => (
          <Typography>
            {champions.data?.entities[c]?.name}
          </Typography>
        ))}
      </Drawer>
    </Container>
  );
};

export default App;
