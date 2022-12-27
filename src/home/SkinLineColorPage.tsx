import {
  Container, Grid, Toolbar, Typography,
} from '@mui/material';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppSelector } from '../glue/hooks';
import { selectSkinLines } from '../skins/skinLineSlice';
import { selectSkins } from '../skins/skinSlice';
import ChromaCard from '../chromas/ChromaCard';
import BrowseDrawer from './BrowseDrawer';
import ColorsGrid from '../chromas/ColorsGrid';

const SkinLineColorPage = () => {
  const { id, color } = useParams();

  const skinLines = useAppSelector(selectSkinLines);
  const skins = useAppSelector(selectSkins);
  const skinLine = skinLines.entities[+id!];

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
      <BrowseDrawer filterBy='skins' />
      <Container>
        <Toolbar>
          {}
        </Toolbar>

        <Link
          to={`/skinLines/${skinLine.id}`}
          className="button muted-button"
          style={{
            textDecoration: 'none',
          }}
        >
          <Typography
            variant="h2"
            color="primary.main"
          >
            {skinLine.name}
          </Typography>
        </Link>
        <Grid container spacing={5} columns={3}>
          <Grid item xs={1}>
            <ColorsGrid skinLine={skinLine} />
          </Grid>
          {Object.values(skinLine.skins)
            .filter((skinId) => skins.entities[skinId]!.chromas)
            .flatMap((skinId) => skins.entities[skinId]!.chromas)
            .filter((chroma) => (`${chroma.colors[0]}_${chroma.colors[1]}`).replaceAll('#', '') === color)
            .map((chroma) => (
              <ChromaCard
                name={chroma.name}
                chromaPath={chroma.chromaPath}
                skinLineId={+id!}
                color={(`${chroma.colors[0]}_${chroma.colors[1]}`).replaceAll('#', '')}
                key={chroma.id}
              />
            ))}
        </Grid>
      </Container>
    </>
  );
};

export default SkinLineColorPage;
