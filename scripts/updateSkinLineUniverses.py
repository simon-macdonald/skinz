#!/usr/bin/env python3

import json
from urllib.request import urlopen

url = 'https://leagueoflegends.fandom.com/wiki/Module:SkinData/universes?action=raw'
data = urlopen(url).read().decode('UTF-8')
lines = data.splitlines(False)

universe_to_skin_lines = {}
skin_line_to_universe = {}

for line in lines[3:-4]:
  if not '=' in line:
    continue
  universe, skin_lines = line.split('=')
  universe = universe.strip()[2:-2]
  skin_lines = [skin_line[1:-1] for skin_line in skin_lines.strip()[1:-2].split(', ')]
  universe_to_skin_lines[universe] = skin_lines
  for skin_line in skin_lines:
    if skin_line in skin_line_to_universe.keys():
      print('The following skin line is represented in multiple universes:')
      print('\t' + skin_line)
    skin_line_to_universe[skin_line] = universe

json_dump = json.dumps(universe_to_skin_lines, indent=2, sort_keys=True)

with open('./src/skins/universe_to_skin_lines.json','w') as f:
    f.write(json_dump)

json_dump = json.dumps(skin_line_to_universe, indent=2, sort_keys=True)

with open('./src/skins/skin_line_to_universe.json','w') as f:
    f.write(json_dump)