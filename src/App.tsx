import React, { useState } from 'react';
import './App.css';
import {
  Button, Card, CardActionArea, CardContent, CardMedia, Container, Drawer, Grid, Typography,
} from '@mui/material';
import SkinThemeSet from './SkinThemeSet';
import skinThemeSets from './skinThemeSets';
import squareChampionImages from './squareChampionImages';

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
  return (
    <Container>
      <Grid container>
        {Object.entries(squareChampionImages).map((entry) => (
          <Grid item xs={1}>
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  image={entry[1]}
                  alt={entry[0]}
                  // onClick={() => {
                  //   if (!champs.includes(entry[0])) {
                  //     setChamps([...champs, entry[0]]);
                  //   } else {
                  //     setChamps(champs.filter((c) => c !== entry[0]));
                  //   }
                  // }}
                />
                <CardContent>
                  <Button
                    disabled={!buttonEnabled(entry[0], findThemes(champs))}
                    variant={champs.includes(entry[0]) ? 'contained' : 'outlined'}
                    // variant="text"
                    onClick={() => {
                      if (!champs.includes(entry[0])) {
                        setChamps([...champs, entry[0]]);
                      } else {
                        setChamps(champs.filter((c) => c !== entry[0]));
                      }
                    }}
                  >
                    {entry[0]}
                  </Button>
                </CardContent>
              </CardActionArea>
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
