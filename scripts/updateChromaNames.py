#!/usr/bin/env python3

import json
from urllib.request import urlopen

url = 'https://cdn.merakianalytics.com/riot/lol/resources/latest/en-US/champions.json'
response = urlopen(url)
data = json.loads(response.read())

chromaNames = {}

for champion in data:
  for skin in data[champion]['skins']:
    for chroma in skin['chromas']:
      if not chroma:
        continue
      color0 = chroma['colors'][0]
      color1 = chroma['colors'][1]
      colorKey = f'{color0}_{color1}'.replace('#', '')
      chromaNames[colorKey] = chroma['name']

jsonDump = json.dumps(chromaNames, indent=2, sort_keys=True)

with open('./src/chromas/chromaNames.json','w') as f:
    f.write(jsonDump)