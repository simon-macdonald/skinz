import {
  AppBar, Button, Toolbar, Typography,
} from '@mui/material';
import React from 'react';
import { Link as LinkReactRouter } from 'react-router-dom';
import Link from '@mui/material/Link';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAppDispatch, useAppSelector } from '../glue/hooks';
import { selectDisplay, showDrawer } from './displaySlice';

const NavBar = () => {
  const dispatch = useAppDispatch();
  const display = useAppSelector(selectDisplay);

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} color="primary">
      <Toolbar variant="dense">
        <LinkReactRouter
          to="/"
          className="button muted-button"
          style={{
            textDecoration: 'none',
          }}
        >
          <Typography variant="h6" component="div" color="white">
            Champions
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
        <Link
          href="https://discord.gg/PsE3Hjvx"
          className="button muted-button"
          style={{
            textDecoration: 'none',
            flexGrow: 1,
          }}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Typography variant="h6" component="div" color="white">
            Disco
          </Typography>
        </Link>
      &nbsp;&nbsp;&nbsp;&nbsp;
        <Button
          onClick={() => dispatch(showDrawer())}
        >
          {display.showDrawer ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
