import React, { useEffect } from 'react';
import { Container, Grid, Toolbar, Typography } from '@mui/material';
import { selectChampions } from '../champions/championSlice';
import { useAppSelector } from '../glue/hooks';
import releaseDates from '../champions/releaseDates.json';
import { selectChampionIdToSkinsMap, selectNewestChampionId } from '../champions/selectors';
import { selectSkins } from '../skins/skinSlice';
import SkinCard from '../skins/SkinCard';

const TitbitsPage = () => {
  const champions = useAppSelector(selectChampions);
  const championSkins = useAppSelector(selectChampionIdToSkinsMap);
  const newestChampionId = useAppSelector(selectNewestChampionId);
  const newestChampion = champions.entities[newestChampionId];
  const date = new Date(releaseDates[newestChampionId as keyof typeof releaseDates]);
  const newestChampionReleaseDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

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
        </>
      )}
    </Container>
  );
};

export default TitbitsPage;
