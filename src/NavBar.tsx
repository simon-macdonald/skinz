import { AppBar, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => (
  <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} color='primary'>
    <Toolbar variant='dense'>
      <Link
        to="/"
        className="button muted-button"
        style={{
          textDecoration: 'none',
        }}
      >
        <Typography variant="h6" component="div" color='white'>
          Home
        </Typography>
      </Link>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Link
        to="/about"
        className="button muted-button"
        style={{
          textDecoration: 'none',
        }}
      >
        <Typography variant="h6" component="div" color='white'>
          About
        </Typography>
      </Link>
    </Toolbar>
  </AppBar>
);

export default NavBar;
