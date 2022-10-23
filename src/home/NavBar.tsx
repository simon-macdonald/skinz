import {
  AppBar, Avatar, Button, Toolbar, Typography,
} from '@mui/material';
import React from 'react';
import { Link as LinkReactRouter } from 'react-router-dom';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAppDispatch, useAppSelector } from '../glue/hooks';
import { selectDisplay, showDrawer } from './displaySlice';

const NavBar = ({ signOut, user }: any) => {
  const dispatch = useAppDispatch();
  const display = useAppSelector(selectDisplay);

  return (
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
            flexGrow: 1,
          }}
        >
          <Typography variant="h6" component="div" color="white">
            About
          </Typography>
        </LinkReactRouter>
      &nbsp;&nbsp;&nbsp;&nbsp;
        <Button
          onClick={() => dispatch(showDrawer())}
        >
          {display.showDrawer ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </Button>
      &nbsp;&nbsp;&nbsp;&nbsp;
        <Button onClick={signOut}>
          Sign Out {user.username}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
