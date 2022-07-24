import { ChampionItem } from "../champions/championSlice";
import { SkinLineItem } from "../skins/skinLineSlice";
import { SkinItem } from "../skins/skinSlice";

interface Everything {
  champions: ChampionItem[],
  skinLines: SkinLineItem[],
  skins: SkinItem[],
}

export default Everything;
