import React from 'react';
import {
  Container, Divider, Toolbar, Typography,
} from '@mui/material';
import { useAppSelector } from '../glue/hooks';
import { selectSkins } from '../skins/skinSlice';
import { selectColors } from '../chromas/colorSlice';

const AboutPage = () => {
  const skins = useAppSelector(selectSkins);
  const colors = useAppSelector(selectColors);

  return (
    <Container>
      <>
        <Toolbar>
          {}
        </Toolbar>
        {[
          'My friends and I started playing League of Legends at the beginning.',
          'It\'s been on and off over the years, and we picked it up again a little more regularly during the Covid lockdowns.',
          'Over that time, we realized we had a lot of skins.',
          `The challenge, though, with ${skins.ids.length} skins, and ${colors.ids.length} chroma colors, is that it's hard to keep track of them all.`,
          'It\'s nice to have matching skins when you\'re playing with friends, so I made this site, with their input, to help us find matching skins.',
          'So pick some champions on the Home page, and see what matching skin lines they have!',
        ].map((line) => (
          <Typography variant="h4" paragraph>
            {line}
          </Typography>
        ))}
        <Divider />
        <Typography variant="h4" paragraph>
          Join the <a href="https://discord.gg/psgphuFnhe">Discord</a> if you have ideas.
        </Typography>
        <Divider />
        <Typography variant="h4" paragraph>
          This site was built with loads of support from <a href="https://www.communitydragon.org/">Community Dragon</a>.
        </Typography>
        <Divider />
        <Typography variant="h4" paragraph>
          Chroma names from <a href="https://github.com/meraki-analytics/lolstaticdata/">Meraki Analytics</a>.
        </Typography>
        <Divider />
        <Typography variant="h4">
          {'skinz.lol was created under Riot Games\' "Legal Jibber Jabber" policy using assets owned by Riot Games.  Riot Games does not endorse or sponsor this project.'}
        </Typography>
      </>
    </Container>
  );
};

export default AboutPage;
