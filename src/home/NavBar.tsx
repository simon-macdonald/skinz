import { Instagram } from '@mui/icons-material';
import {
  Alert,
  AppBar, Avatar, Link, Toolbar, Typography,
} from '@mui/material';
import React from 'react';
import { Link as LinkReactRouter } from 'react-router-dom';

const BUGGY = false;

const NavBar = () => (
  <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} color="primary">
    <Toolbar variant="dense">
      <Avatar alt="skinz.lol logo" src="/logo.png" />
      &nbsp;&nbsp;&nbsp;&nbsp;
      <LinkReactRouter
        to="/"
        className="button muted-button"
        style={{
          textDecoration: 'none',
        }}
      >
        <Typography variant="h6" component="div" color="white">
          Skins
        </Typography>
      </LinkReactRouter>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <LinkReactRouter
        to="/chromas"
        className="button muted-button"
        style={{
          textDecoration: 'none',
        }}
      >
        <Typography variant="h6" component="div" color="white">
          Chromas
        </Typography>
      </LinkReactRouter>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <LinkReactRouter
        to="/latest"
        className="button muted-button"
        style={{
          textDecoration: 'none',
        }}
      >
        <Typography variant="h6" component="div" color="white">
          Latest
        </Typography>
      </LinkReactRouter>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <LinkReactRouter
        to="/challenges"
        className="button muted-button"
        style={{
          textDecoration: 'none',
        }}
      >
        <Typography variant="h6" component="div" color="white">
          Challenges
        </Typography>
      </LinkReactRouter>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <LinkReactRouter
        to="/about"
        className="button muted-button"
        style={{
          textDecoration: 'none',
        }}
      >
        <Typography variant="h6" component="div" color="white">
          About
        </Typography>
      </LinkReactRouter>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Link href="https://www.instagram.com/simondotvoyage/" target="_blank">
        <Typography color="white">
          <Instagram />
        </Typography>
      </Link>
      &nbsp;&nbsp;&nbsp;&nbsp;
      {BUGGY && (
        <Alert variant="outlined" severity="warning">
          Super buggy right now. Thanks for your patience!
        </Alert>
      )}
    </Toolbar>
  </AppBar>
);

export default NavBar;
