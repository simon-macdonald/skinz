const getAssetUrl = (path: string) => `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/${path.replace('/lol-game-data/assets/', '')}`;
export const getChampionTileUrl = (championId: number) => `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-tiles/${championId}/${championId}000.jpg`;

export default getAssetUrl;
