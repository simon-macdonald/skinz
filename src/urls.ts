const getAssetUrl = (path: string) => `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/${path.replace('/lol-game-data/assets/', '')}`.toLowerCase();
export const getChampionTileUrl = (championAlias: string) => {
  if (['leesin', 'teemo'].includes(championAlias.toLowerCase())) {
    return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/characters/${championAlias}/skins/base/images/${championAlias}_splash_tile_0.asu_${championAlias}.jpg`.toLowerCase();
  }
  if (['aurora'].includes(championAlias.toLowerCase())) {
    return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/characters/${championAlias}/skins/base/images/${championAlias}_splash_tile_0.${championAlias}.jpg`.toLowerCase();
  }
  if (['hwei'].includes(championAlias.toLowerCase())) {
    return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/characters/${championAlias}/skins/skin0/images/${championAlias}_splash_tile_0.jpg`.toLowerCase();
  }
  return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/characters/${championAlias}/skins/base/images/${championAlias}_splash_tile_0.jpg`.toLowerCase();
};

export default getAssetUrl;
