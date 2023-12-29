import {
  Container, Grid, Toolbar, Typography
} from '@mui/material';
import { useParams } from 'react-router-dom';
import ColorsGrid from '../chromas/ColorsGrid';
import { useAppSelector } from '../glue/hooks';
import BrowseDrawer from '../home/BrowseDrawer';
import { selectSkinLineIdAndChampionIdToSkinIdBiMap } from '../skins/selectors';
import SkinCard from '../skins/SkinCard';
import { selectSkinLines } from './skinLineSlice';

const SkinLinePage = () => {
  const { id } = useParams();

  const skinLines = useAppSelector(selectSkinLines);
  const skinIds = useAppSelector(selectSkinLineIdAndChampionIdToSkinIdBiMap);
  const skinLine = skinLines.entities[+id!];

  return (
    <>
      <BrowseDrawer filterBy="skins" />
      <Container>
        <Toolbar>
          { }
        </Toolbar>
        <Typography variant="h3">
          {skinLine?.name || '...'}
        </Typography>
        <Grid container sx={{ marginTop: 0 }} spacing={5} columns={3}>
          <Grid item xs={1}>
            <Typography variant="h5">
              Universe: {skinLine?.universe || '...'}
            </Typography>
            <ColorsGrid skinLine={skinLine} />
          </Grid>
          {skinLine && skinIds && skinIds[skinLine.id] && Object.values(skinIds[skinLine.id])
            .map((skinId) => (
              <SkinCard id={skinId} key={skinId} />
            ))}
        </Grid>
      </Container>
    </>
  );
};

export default SkinLinePage;
