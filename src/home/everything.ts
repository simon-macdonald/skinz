import { ChampionItem } from '../champions/championSlice';
import { SkinLineItem } from '../skins/skinLineSlice';
import { SkinItem } from '../skins/skinSlice';
import { ChallengeItem } from '../challenges/challengeSlice';

interface Everything {
  champions: ChampionItem[],
  skinLines: SkinLineItem[],
  skins: SkinItem[],
  challenges: {
    challenges: ChallengeItem[]
  },
}

export default Everything;
