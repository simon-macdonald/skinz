import React from 'react';
import './App.css';
import {
  Container, Paper, Typography,
} from '@mui/material';

const AboutPage = () => {
  return (
    <Container>
      <Paper>
        <Typography variant='h3'>
          skinz.lol helps players look good. Before a game starts, it's important for players to coordinate their skins, chromas, and borders, to ensure they spark fear in their opponents. Who wouldn't be terrified of an all Trick-or-Treat lineup? With skinz.lol, players select champions, and matching skin lines display on the page.
          <p/>
          Maybe friends lose—with skinz.lol, they'll do it in style.
        </Typography>
      </Paper>
    </Container>
  );
};

export default AboutPage;
