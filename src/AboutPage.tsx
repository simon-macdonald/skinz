import React from 'react';
import './App.css';
import {
  Container, Divider, Toolbar, Typography,
} from '@mui/material';
import { championApi } from './champions/champions';
import { useAppSelector } from './store/hooks';

const AboutPage = () => {
  const skins = useAppSelector(championApi.endpoints.getSkins.select(''));

  return (
    <Container>
      <Toolbar>
        {}
      </Toolbar>
      <Typography variant="h4" paragraph>
        My friends and I started playing League of Legends during its beta mode.
      </Typography>
      <Typography variant="h4" paragraph>
        It&apos;s been on and off over the years, and we picked it up again a little more regularly during the Covid lockdowns.
      </Typography>
      <Typography variant="h4" paragraph>
        Over that time, we realized we had a lot of skins.
      </Typography>
      <Typography variant="h4" paragraph>
        The challenge, though, with {skins.data!.ids.length} skins, is that it&apos;s hard to keep track of them all.
      </Typography>
      <Typography variant="h4" paragraph>
        It&apos;s nice to have matching skins when you&apos;re playing with friends, so I made this site, with their input, to help us find matching skins.
      </Typography>
      <Typography variant="h4" paragraph>
        So pick some champions on the Home page, and see what matching skin lines they have!
      </Typography>
      <Divider />
      <Typography variant="h4" paragraph>
        This site was built with loads of support from <a href='https://www.communitydragon.org/'>Community Dragon</a>.
      </Typography>
    </Container>
  );
}

export default AboutPage;
