#!/usr/bin/env python3

import json
from urllib.request import urlopen

url = 'https://leagueoflegends.fandom.com/wiki/Module:SkinData/universes?action=raw'
data = urlopen(url).read().decode('UTF-8')
lines = data.splitlines(False)

universes = {}

for line in lines[3:-4]:
  left, right = line.split('=')
  universes[left.strip()[2:-2]] = [x[1:-1] for x in right.strip()[1:-2].split(', ')]
print(universes)

jsonDump = json.dumps(universes, indent=2, sort_keys=True)

with open('./src/skins/universes.json','w') as f:
    f.write(jsonDump)