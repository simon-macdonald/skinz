const getAssetUrl = (path: string) => `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/${path.replace('/lol-game-data/assets/', '')}`.toLowerCase();
export const getChampionTileUrl = (championAlias: string) => `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/characters/${championAlias}/skins/base/images/${championAlias}_splash_tile_0.jpg`.toLowerCase();

export default getAssetUrl;
