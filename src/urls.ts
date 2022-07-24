const getAssetUrl = (path: string) => `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/${path.replace('/lol-game-data/assets/', '')}`;

export default getAssetUrl;
