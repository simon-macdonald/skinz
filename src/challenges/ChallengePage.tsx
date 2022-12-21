import React from 'react';
import '../glue/App.css';
import {
  Avatar,
  Checkbox,
  Container, Divider, IconButton, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar, Tooltip, Typography,
} from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import { Clear, Sort } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../glue/hooks';
import { selectChallenges } from './challengeSlice';
import { selectChampions } from '../champions/championSlice';
import {
  clickWhoDidWhatCheckbox, selectWhoDidWhat, whoDidWhatState, WhoDidWhatState,
} from './whoDidWhatSlice';
import getAssetUrl from '../urls';
import BrowseDrawer from '../home/BrowseDrawer';

const getChallengeIconPath = (path: string) => `https://raw.communitydragon.org/latest/game/${path.toLowerCase().replace('/lol-game-data/assets/', '')}`;

const ChallengePage = () => {
  const challenges = useAppSelector(selectChallenges);
  const champions = useAppSelector(selectChampions);
  const whoDidWhat = useAppSelector(selectWhoDidWhat);
  const dispatch = useAppDispatch();

  const [championIds, setChampionIds] = React.useState(champions.ids);
  const [sortBy, setSortBy] = React.useState('');

  const [find, setFind] = React.useState('');

  const handleFindChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFind(event.target.value);
  };
  return (
    <>
      <BrowseDrawer />
      <Container>
        <Toolbar>
          {}
        </Toolbar>
        <TableContainer component={Paper}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="h4" gutterBottom>
                    Challenges
                    <Tooltip title={(
                      <Typography variant="h4" gutterBottom>
                        Track the challenges you have progressed with each champion. It&apos;s hard to remember in the lobby!
                      </Typography>
                    )}
                    >
                      <HelpIcon />
                    </Tooltip>
                  </Typography>
                </TableCell>
                {Object.keys(whoDidWhatState).map((challengeName) => {
                  const challenge = challenges.entities[challengeName]!;
                  const { levelToIconPath } = challenge;
                  const howManyChampsDoIHave = whoDidWhat[challengeName as keyof WhoDidWhatState].length;
                  const { thresholds } = challenge;
                  const iconPath =
                    howManyChampsDoIHave >= thresholds.MASTER.value ? levelToIconPath.MASTER :
                      howManyChampsDoIHave >= thresholds.DIAMOND.value ? levelToIconPath.DIAMOND :
                        howManyChampsDoIHave >= thresholds.PLATINUM.value ? levelToIconPath.PLATINUM :
                          howManyChampsDoIHave >= thresholds.GOLD.value ? levelToIconPath.GOLD :
                            howManyChampsDoIHave >= thresholds.SILVER.value ? levelToIconPath.SILVER :
                              (howManyChampsDoIHave >= thresholds.BRONZE.value || !thresholds.IRON) ? levelToIconPath.BRONZE :
                                howManyChampsDoIHave >= thresholds.IRON.value ? levelToIconPath.IRON :
                                  levelToIconPath.IRON;
                  return (
                    <TableCell>
                      <Tooltip title={(
                        <>
                          <Typography variant="h4" gutterBottom>
                            {challenge.name}
                          </Typography>
                          <Divider />
                          <Typography variant="h5" gutterBottom>
                            {challenge.description}
                          </Typography>
                        </>
                      )}
                      >
                        <Avatar src={getChallengeIconPath(iconPath)} />
                      </Tooltip>
                      <Typography variant="h5" gutterBottom>
                        {`${howManyChampsDoIHave}/${thresholds.MASTER.value}`}
                      </Typography>
                    </TableCell>
                  );
                })}
              </TableRow>
              <TableRow>
                <TableCell>
                  <TextField
                    label="Find Champion"
                    variant="outlined"
                    value={find}
                    onChange={handleFindChange}
                    InputProps={{
                      endAdornment:
  <InputAdornment position="end">
    {find !== '' && (
    <IconButton onClick={() => setFind('')}>
      <Clear />
    </IconButton>
    )}
  </InputAdornment>,
                    }}
                  />
                </TableCell>
                {Object.keys(whoDidWhatState).map((challengeName) => (
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => {
                        if (sortBy === challengeName) {
                          setChampionIds(champions.ids);
                          setSortBy('');
                          return;
                        }
                        const completed = champions.ids.filter((id) => whoDidWhat[challengeName as keyof WhoDidWhatState].includes(id as number));
                        const uncompleted = champions.ids.filter((id) => !whoDidWhat[challengeName as keyof WhoDidWhatState].includes(id as number));
                        const all = completed.concat(uncompleted);
                        setChampionIds(all);
                        setSortBy(challengeName);
                      }}
                      aria-label={`sort by ${challengeName}`}
                    >
                      <Sort
                        sx={{ transform: sortBy === challengeName ? 'rotate(0.5turn)' : 'rotate(0)' }}
                        color={sortBy === challengeName ? 'secondary' : 'primary'}
                      />
                    </IconButton>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {championIds.filter((id) => find === '' || champions.entities[id]!.name.toLowerCase().includes(find.toLowerCase())).map((id) => champions.entities[id]).map((champion) => (
                <TableRow
                  key={champion!.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>
                    <Avatar src={getAssetUrl(champion!.squarePortraitPath)} variant="square" />
                  </TableCell>
                  {Object.keys(whoDidWhatState).map((challenge) => (
                    <TableCell>
                      <Tooltip title={(
                        <Typography variant="h4" gutterBottom>
                          {challenge}
                        </Typography>
                      )}
                      >
                        <Checkbox
                          checked={whoDidWhat[challenge as keyof WhoDidWhatState].includes(champion!.id)}
                          onChange={() => { dispatch(clickWhoDidWhatCheckbox([challenge, champion!.id])); }}
                        />
                      </Tooltip>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default ChallengePage;
