import React from 'react';
import {
  Container, Grid, Toolbar, Typography,
} from '@mui/material';
import { selectChampions } from '../champions/championSlice';
import releaseDates from '../champions/releaseDates.json';
import { selectChampionIdToSkinsMap, selectNewestChampionId } from '../champions/selectors';
import { useAppSelector } from '../glue/hooks';
import { selectNewestSkinLineId } from '../skinlines/selectors';
import { selectSkinLines } from '../skinlines/skinLineSlice';
import { selectChronologicalSkinIds } from '../skins/selectors';
import SkinCard from '../skins/SkinCard';

const LatestPage = () => {
  const champions = useAppSelector(selectChampions);
  const championSkins = useAppSelector(selectChampionIdToSkinsMap);
  const newestChampionId = useAppSelector(selectNewestChampionId);
  const newestChampion = champions.entities[newestChampionId];
  const date = new Date(releaseDates[newestChampionId as keyof typeof releaseDates]);
  const newestChampionReleaseDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const skinLines = useAppSelector(selectSkinLines);
  const newestSkinLine = useAppSelector(selectNewestSkinLineId);
  const newestSkinLineId = newestSkinLine?.key;
  const newestSkinLineReleaseDate = new Date(newestSkinLine?.value);
  const prettyNewestSkinLineReleaseDate = newestSkinLineReleaseDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const skinIds = useAppSelector(selectChronologicalSkinIds(+newestSkinLineId));

  return (
    <Container>
      <Toolbar>
        { }
      </Toolbar>
      {newestChampionId !== -1 && (
        <>
          <Typography variant="h4" gutterBottom>
            The newest champion is {newestChampion?.name}.
            They were released on {newestChampionReleaseDate}.
            They currently have {championSkins[+newestChampionId]?.length} skins, including baseline.
          </Typography>
          <Grid container sx={{ marginTop: 0 }} spacing={5} columns={3}>
            {championSkins[+newestChampionId] && (
              <>
                {
                  championSkins[+newestChampionId]
                    .map((skinId) => (
                      <SkinCard id={skinId} key={skinId} />
                    ))
                }
              </>
            )}
          </Grid>
          <Typography variant="h4" gutterBottom>
            The newest skin line is {skinLines.entities[newestSkinLineId]?.name}.
            It was released on {prettyNewestSkinLineReleaseDate}.
            It currently has {skinIds.length} skins.
          </Typography>
          <Grid container sx={{ marginTop: 0 }} spacing={5} columns={3}>
            {skinLines.entities[newestSkinLineId] && skinIds && skinIds
              .map((skinId) => (
                <SkinCard id={skinId} key={skinId} />
              ))}
          </Grid>
        </>
      )}
    </Container>
  );
};

export default LatestPage;
