import { ChampionItem } from "./championSlice";
import { SkinLineItem } from "./skinLineSlice";
import { SkinItem } from "./skinSlice";

interface Everything {
  champions: ChampionItem[],
  skinLines: SkinLineItem[],
  skins: SkinItem[],
}

export default Everything;
