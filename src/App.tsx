import React from 'react';
import './App.css';
import {
  Box,
  Card, CardActionArea, CardContent, CardMedia, Container, createTheme, Divider, Drawer, GlobalStyles, Grid, Paper, ThemeProvider, Typography, useMediaQuery,
} from '@mui/material';
import SkinThemeSet from './SkinThemeSet';
import {
  useGetChampionSummaryQuery,
  useGetSkinLinesQuery,
  useGetSkinsQuery,
} from './champions/champions';
import { useAppDispatch, useAppSelector } from './hooks';
import { selectTitle } from './champions/championSlice';
import { clearChosenChampions, clickChampion, selectChosenChampions } from './champions/chosenChampionsSlice';
import { selectSkinLineHover } from './champions/skinLineHoverSlice';

function findThemes(champions: number[], skinLines: any): number[] {
  if (champions.length === 0) {
    return skinLines.data.ids;
  }

  const answers1: number[] = [];
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
  themes: number[],
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
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const title = useAppSelector(selectTitle);
  const skinLineHover = useAppSelector(selectSkinLineHover);
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

  const theme = createTheme({
    palette: {
      mode: prefersDarkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container>
        {prefersDarkMode && (
        <GlobalStyles
          styles={{
            body: { backgroundColor: '#121212' },
          }}
        />
        )}
        <Grid container spacing={2} columns={60}>
          {champions.data.ids
            .filter((id) => id > 0)
            .filter((id) => champs.champions.includes(id as number)
              || buttonEnabled(
                id as number,
                findThemes(champs.champions, skinLines),
                skinLines,
              ))
            .map((id) => (
              <Grid item xs={30} sm={20} md={12} lg={10} xl={6}>
                <Card>
                  <CardActionArea onClick={() => { dispatch(clickChampion(id as number)); }}>
                    <CardMedia
                      component="img"
                      image={
                    skinLineHover === 0 ? `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/${champions.data.entities[id]!.squarePortraitPath.replace('/lol-game-data/assets/', '')}`
                      : skinLines.data.entities[skinLineHover]?.champions.includes(id as number) ? `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/${skins.data!.entities[skinLines.data!.entities[skinLineHover]!.skins[skinLines.data!.entities[skinLineHover]!.champions.indexOf(id as number)]]!.tilePath.replace('/lol-game-data/assets/', '')}`
                        : `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/${champions.data.entities[id]!.squarePortraitPath.replace('/lol-game-data/assets/', '')}`
                }
                      alt={champions.data.entities[id]!.name}
                    />
                    <CardContent sx={{
                      bgcolor: skinLines.data.entities[skinLineHover]?.champions.includes(id as number) ? 'secondary.main' : champs.champions.includes(id as number) || skinLines.data.entities[skinLineHover]?.champions.includes(id as number) ? 'primary.main' : 'transparent',
                    }}
                    >
                      <Typography component="div" noWrap align="center">
                        <Box sx={{
                          fontWeight: 'bold',
                          textTransform: 'capitalize',
                        }}
                        >
                          {champions.data.entities[id]!.name}
                        </Box>
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
            {champs.champions.length > 0 && (
              <Grid item xs={30} sm={20} md={12} lg={10} xl={6}>
                <Card>
                  <CardActionArea onClick={() => { dispatch(clearChosenChampions()); }}>
                    <CardMedia
                      component="img"
                      image={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/${champions.data.entities[-1]!.squarePortraitPath.replace('/lol-game-data/assets/', '')}`}
                      alt='Clear Champions'
                    />
                    <CardContent>
                      <Typography component="div" noWrap align="center">
                        <Box sx={{
                          fontWeight: 'bold',
                          textTransform: 'capitalize',
                        }}
                        >
                          Clear
                        </Box>
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            )}
        </Grid>
        <Paper>
          <Typography variant="h5">
            skinz.lol isn&apos;t endorsed by Riot Games and doesn&apos;t reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot Games properties. Riot Games, and all associated properties are trademarks or registered trademarks of Riot Games, Inc.
          </Typography>
        </Paper>
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
          <Typography variant="h4">
            Skin Lines
          </Typography>
          <Divider />
          {findThemes(champs.champions, skinLines).map((skinLine) => <SkinThemeSet theme={skinLine} />)}
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
    </ThemeProvider>
  );
};

export default App;
