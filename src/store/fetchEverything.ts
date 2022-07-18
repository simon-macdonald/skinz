import { createAsyncThunk } from '@reduxjs/toolkit';
import Everything from './everything';
import { AppDispatch, RootState } from './store';

const fetchEverything = createAsyncThunk<
// Return type of the payload creator
Everything,
number,
// First argument to the payload creator
{
  // Optional fields for defining thunkApi field types
  dispatch: AppDispatch
  state: RootState
}
>('fetchEverything', async () => {
  const champions = await fetch('https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-summary.json');
  const skinLines = await fetch('https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/skinlines.json');
  const skins = await fetch('https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/skins.json');
  return {
    champions: await champions.json(),
    skinLines: await skinLines.json(),
    skins: await skins.json(),
  };
});

export default fetchEverything;
