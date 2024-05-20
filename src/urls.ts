const getAssetUrl = (path: string) => `https://raw.communitydragon.org/14.9/plugins/rcp-be-lol-game-data/global/default/${path.replace('/lol-game-data/assets/', '')}`;
export const getChampionTileUrl = (championId: number) => `https://raw.communitydragon.org/14.9/plugins/rcp-be-lol-game-data/global/default/v1/champion-tiles/${championId}/${championId}000.jpg`;
// export const getChampionTileUrl = (championId: number) => `https://cdn.communitydragon.org/14.9/champion/${championId}/splash-art/centered/skin/0`

export default getAssetUrl;
