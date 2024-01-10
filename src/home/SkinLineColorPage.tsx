import { NavigateNext } from '@mui/icons-material';
import {
  Breadcrumbs,
  Container, Grid, Toolbar, Typography,
} from '@mui/material';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import ChromaCard from '../chromas/ChromaCard';
import chromaNames from '../chromas/chromaNames.json';
import ColorsGrid from '../chromas/ColorsGrid';
import { useAppSelector } from '../glue/hooks';
import { selectSkinLines } from '../skinlines/skinLineSlice';
import { selectSkinLineIdAndChampionIdToSkinIdBiMap } from '../skins/selectors';
import { selectSkins } from '../skins/skinSlice';
import BrowseDrawer from './BrowseDrawer';

const SkinLineColorPage = () => {
  const { id, color } = useParams();

  const skinLines = useAppSelector(selectSkinLines);
  const skinIds = useAppSelector(selectSkinLineIdAndChampionIdToSkinIdBiMap);
  const skins = useAppSelector(selectSkins);
  const skinLine = skinLines.entities[+id!];
  const urlColor = useParams().color;

  const [hover, setHover] = React.useState(false);

  return (
    <>
      <BrowseDrawer filterBy="skins" />
      <Container>
        <Toolbar>
          { }
        </Toolbar>
        <Breadcrumbs separator={<NavigateNext />}>
          <Link
            to={`/skinLines/${skinLine?.id || '...'}`}
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
              {skinLine?.name || '...'}
            </Typography>
          </Link>
          <Typography variant="h3">
            {(urlColor && chromaNames[urlColor as keyof typeof chromaNames]) || 'View chromas:'}
          </Typography>
        </Breadcrumbs>
        {/* see https://github.com/mui/material-ui/issues/30617 for marginTop attribute */}
        <Grid container sx={{ marginTop: 0 }} spacing={5} columns={3}>
          <Grid item xs={1}>
            <Typography variant="h5">
              Universe: {skinLine?.universe || '...'}
            </Typography>
            <ColorsGrid skinLine={skinLine} />
          </Grid>
          {skinLine && skinIds[skinLine.id] && Object
            .values(skinIds[skinLine.id])
            .filter((skinId) => skins.entities[skinId]!.chromas)
            .flatMap((skinId) => skins.entities[skinId]!.chromas)
            .filter((chroma) => chroma.colorsKey === color)
            .map((chroma) => (
              <ChromaCard
                skinName={chroma.name}
                chromaPath={chroma.chromaPath}
                skinLineId={+id!}
                color={chroma.colorsKey}
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
