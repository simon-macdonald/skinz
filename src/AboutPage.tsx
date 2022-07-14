import React from 'react';
import './App.css';
import {
  Container, Toolbar, Typography,
} from '@mui/material';

const AboutPage = () => (
  <Container>
    <Toolbar>
      {}
    </Toolbar>
    <Typography variant="h4" paragraph>
      skinz.lol helps players look good.
    </Typography>
    <Typography variant="h4" paragraph>
      Before a game starts, it&apos;s important for players to coordinate their skins, chromas, and borders, to ensure they spark fear in their opponents.
    </Typography>
    <Typography variant="h4" paragraph>
      Who wouldn&apos;t be terrified of an all Trick-or-Treat lineup?
    </Typography>
    <Typography variant="h4" paragraph>
      With skinz.lol, players select champions, and matching skin lines display on the page.
    </Typography>
    <Typography variant="h4" paragraph>
      Maybe friends lose—with skinz.lol, they&apos;ll do it in style.
    </Typography>
  </Container>
);

export default AboutPage;
