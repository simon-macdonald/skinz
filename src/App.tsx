import React, { useState } from 'react';
import './App.css';
import {
  Card, CardActions, CardMedia, Chip, Container, Drawer, Grid, Typography,
} from '@mui/material';
import SkinThemeSet from './SkinThemeSet';
import skinThemeSets from './skinThemeSets';
import squareChampionImages from './squareChampionImages';
import { useGetChampionByIdQuery } from './champions/champions';
import { useAppDispatch, useAppSelector } from './hooks';
import { selectTitle, setTitle } from './champions/championSlice';

const findThemes = (champions: string[]) => {
  if (champions.length === 0) {
    return [];
  }
  const answers: string[] = [];
  Object.keys(skinThemeSets).forEach((k) => {
    const champs = skinThemeSets[k];
    let allIn = true;
    champions.forEach((c) => {
      if (!champs.includes(c)) {
        allIn = false;
      }
    });
    if (allIn) {
      answers.push(k);
    }
  });
  return answers;
};

const buttonEnabled = (champion: string, themes: string[]) => {
  if (themes.length === 0) {
    return true;
  }
  let found = false;
  themes.forEach((theme) => {
    skinThemeSets[theme].forEach((c) => {
      if (c === champion) {
        found = true;
      }
    });
  });
  return found;
};

const App = () => {
  const [champs, setChamps] = useState<string[]>([]);
  const { data, error, isLoading } = useGetChampionByIdQuery(1);

  const title = useAppSelector(selectTitle);
  const dispatch = useAppDispatch();

  return (
    <Container maxWidth="xl">
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <h3>
          Query:
          {data.name}
        </h3>
      ) : null}
      {`Latest Pick: ${title}`}
      <Grid container spacing={2} columns={60}>
        {Object
          .entries(squareChampionImages)
          .filter((entry) => champs.includes(entry[0])
          || (!champs.includes(entry[0]) && buttonEnabled(entry[0], findThemes(champs))))
          .map((entry) => (
            <Grid item xs={15} sm={10} md={6} lg={5} xl={4}>
              <Card>
                <CardMedia
                  component="img"
                  image={entry[1]}
                  alt={entry[0]}
                />
                <CardActions>
                  {champs.includes(entry[0])
                  && (
                  <Chip
                    label={entry[0]}
                    color="primary"
                    onDelete={() => setChamps(champs.filter((c) => c !== entry[0]))}
                  />
                  )}
                  {(!champs.includes(entry[0]) && buttonEnabled(entry[0], findThemes(champs)))
                  && (
                    <Chip
                      label={entry[0]}
                      color="primary"
                      variant="outlined"
                      onClick={() => {
                        setChamps([...champs, entry[0]]);
                        dispatch(setTitle(entry[0]));
                      }}
                    />
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
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
        {findThemes(champs).map((theme) => <SkinThemeSet theme={theme} />)}
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
