import {
  Breadcrumbs,
  Container, Grid, Toolbar, Typography,
} from '@mui/material';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { NavigateNext } from '@mui/icons-material';
import { useAppSelector } from '../glue/hooks';
import { selectSkinLines } from '../skins/skinLineSlice';
import { selectSkins } from '../skins/skinSlice';
import ChromaCard from '../chromas/ChromaCard';
import BrowseDrawer from './BrowseDrawer';
import ColorsGrid from '../chromas/ColorsGrid';
import chromaNames from '../chromas/chromaNames.json';

const SkinLineColorPage = () => {
  const { id, color } = useParams();

  const skinLines = useAppSelector(selectSkinLines);
  const skins = useAppSelector(selectSkins);
  const skinLine = skinLines.entities[+id!];
  const urlColor = useParams().color;

  const [hover, setHover] = React.useState(false);

  if (skinLine === undefined) {
    return (
      <Container>
        <Toolbar>
          {}
        </Toolbar>
        <Typography variant="h2">
          This is a bug.
        </Typography>
      </Container>
    );
  }

  return (
    <>
      <BrowseDrawer filterBy="skins" />
      <Container>
        <Toolbar>
          {}
        </Toolbar>
        <Breadcrumbs separator={<NavigateNext />}>
          <Link
            to={`/skinLines/${skinLine.id}`}
            className="button muted-button"
            style={{
              textDecoration: 'none',
            }}
          >
            <Typography
              variant="h3"
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              color={hover ? 'secondary.main' : 'primary.main'}
            >
              {skinLine.name}
            </Typography>
          </Link>
          <Typography variant="h3">
            {(urlColor && chromaNames[urlColor as keyof typeof chromaNames]) || 'View chromas:'}
          </Typography>
        </Breadcrumbs>
        {/* see https://github.com/mui/material-ui/issues/30617 for marginTop attribute */}
        <Grid container sx={{ marginTop: 0 }} spacing={5} columns={3}>
          <Grid item xs={1}>
            <ColorsGrid skinLine={skinLine} />
          </Grid>
          {Object.values(skinLine.skins)
            .filter((skinId) => skins.entities[skinId]!.chromas)
            .flatMap((skinId) => skins.entities[skinId]!.chromas)
            .filter((chroma) => (`${chroma.colors[0]}_${chroma.colors[1]}`).replaceAll('#', '') === color)
            .map((chroma) => (
              <ChromaCard
                skinName={chroma.name}
                chromaPath={chroma.chromaPath}
                skinLineId={+id!}
                color={(`${chroma.colors[0]}_${chroma.colors[1]}`).replaceAll('#', '')}
                displayText="skinName"
                key={chroma.id}
              />
            ))}
        </Grid>
      </Container>
    </>
  );
};

export default SkinLineColorPage;
