import React from 'react';
import '../glue/App.css';
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
          This site was built with loads of support from <a href="https://www.communitydragon.org/">Community Dragon</a>.
        </Typography>
        <Divider />
        <Typography variant="h4">
          skinz.lol isn&apos;t endorsed by Riot Games and doesn&apos;t reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot Games properties. Riot Games, and all associated properties are trademarks or registered trademarks of Riot Games, Inc.
        </Typography>
      </>
    </Container>
  );
};

export default AboutPage;
