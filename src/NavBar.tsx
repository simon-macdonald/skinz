import { AppBar, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => (
  <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
    <Toolbar variant="dense">
      <Link
        to="/"
        className="button muted-button"
        style={{
          textDecoration: 'none',
        }}
      >
        <Typography variant="h6" color="inherit" component="div">
          Home
        </Typography>
      </Link>
    </Toolbar>
  </AppBar>
);

export default NavBar;
