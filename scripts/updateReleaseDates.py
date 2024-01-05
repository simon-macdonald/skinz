#!/usr/bin/env python3

import json
from urllib.request import urlopen

url = 'https://cdn.merakianalytics.com/riot/lol/resources/latest/en-US/champions.json'
response = urlopen(url)
data = json.loads(response.read())

championReleaseDates = {}
skinReleaseDates = {}

for champion in data.values():
  championReleaseDates[champion['id']] = champion['releaseDate']
  for skin in champion['skins']:
    skinReleaseDates[skin['id']] = skin['release']

jsonDump = json.dumps(championReleaseDates, indent=2, sort_keys=True)
with open('./src/champions/releaseDates.json','w') as f:
    f.write(jsonDump)

jsonDump = json.dumps(skinReleaseDates, indent=2, sort_keys=True)
with open('./src/skins/releaseDates.json','w') as f:
    f.write(jsonDump)