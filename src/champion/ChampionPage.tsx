import {
  Container, Paper, Toolbar, Typography,
} from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { selectChampions } from '../store/championSlice';
import { useAppSelector } from '../store/hooks';

const ChampionPage = () => {
  const { id } = useParams();

  const skins = useAppSelector(selectChampions);

  return (
    <Container>
      <Toolbar>
        {}
      </Toolbar>
      {id && (
        <Paper>
          <Typography variant="h2">
            {skins.entities[id]?.name}
          </Typography>
        </Paper>
      )}
    </Container>
  );
};

export default ChampionPage;
