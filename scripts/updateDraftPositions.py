#!/usr/bin/env python3

import json
from urllib.request import urlopen

url = 'https://cdn.merakianalytics.com/riot/lol/resources/latest/en-US/champions.json'
response = urlopen(url)
data = json.loads(response.read())

positions = {}

for champion in data:
  positions[champion] = data[champion]['positions']

jsonDump = json.dumps(positions, indent=2, sort_keys=True)

with open('./src/champions/draftPositions.json','w') as f:
    f.write(jsonDump)