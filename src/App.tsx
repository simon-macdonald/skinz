import React, { useState } from 'react';
import './App.css';
import {
  Button, Card, CardActionArea, CardContent, CardMedia, Container, Grid, Typography,
} from '@mui/material';

const squareChampionImages = {
  Aatrox: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/c/cc/AatroxSquare.png',
  Ahri: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/1/18/AhriSquare.png',
  Akali: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/a/a5/AkaliSquare.png',
  Akshan: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/3/3b/AkshanSquare.png',
  Alistar: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/3/34/AlistarSquare.png',
  Amumu: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/2/26/AmumuSquare.png',
  Anivia: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/0/01/AniviaSquare.png',
  Annie: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/6/6f/AnnieSquare.png',
  Aphelios: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/1/13/ApheliosSquare.png',
  Ashe: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/4/4a/AsheSquare.png',
  'Aurelion Sol': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/c/c3/Aurelion_SolSquare.png',
  Azir: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/f/f7/AzirSquare.png',
  Bard: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/6/69/BardSquare.png',
  Blitzcrank: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/5/5b/BlitzcrankSquare.png',
  Brand: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/a/ab/BrandSquare.png',
  Braum: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/b/b6/BraumSquare.png',
  Caitlyn: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/e/e6/CaitlynSquare.png',
  Camille: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/1/13/CamilleSquare.png',
  Cassiopeia: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/c/ca/CassiopeiaSquare.png',
  "Cho'Gath": 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/a/ae/Cho%27GathSquare.png',
  Corki: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/3/3d/CorkiSquare.png',
  Darius: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/5/54/DariusSquare.png',
  Diana: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/9/90/DianaSquare.png',
  'Dr. Mundo': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/3/35/Dr._MundoSquare.png',
  Draven: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/d/d7/DravenSquare.png',
  Ekko: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/e/ef/EkkoSquare.png',
  Elise: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/9/91/EliseSquare.png',
  Evelynn: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/5/5b/EvelynnSquare.png',
  Ezreal: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/c/c3/EzrealSquare.png',
  Fiddlesticks: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/7/7c/FiddlesticksSquare.png',
  Fiora: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/d/d2/FioraSquare.png',
  Fizz: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/d/db/FizzSquare.png',
  Galio: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/4/40/GalioSquare.png',
  Gangplank: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/f/fe/GangplankSquare.png',
  Garen: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/e/ea/GarenSquare.png',
  Gnar: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/6/6b/GnarSquare.png',
  Gragas: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/6/67/GragasSquare.png',
  Graves: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/2/26/GravesSquare.png',
  Gwen: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/d/df/GwenSquare.png',
  Hecarim: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/4/4c/HecarimSquare.png',
  Heimerdinger: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/5/58/HeimerdingerSquare.png',
  Illaoi: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/a/a7/IllaoiSquare.png',
  Irelia: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/7/72/IreliaSquare.png',
  Ivern: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/9/9d/IvernSquare.png',
  Janna: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/3/3f/JannaSquare.png',
  'Jarvan IV': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/6/6c/Jarvan_IVSquare.png',
  Jax: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/0/0f/JaxSquare.png',
  Jayce: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/a/aa/JayceSquare.png',
  Jhin: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/8/8b/JhinSquare.png',
  Jinx: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/e/e2/JinxSquare.png',
  "Kai'Sa": 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/4/49/Kai%27SaSquare.png',
  Kalista: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/a/aa/KalistaSquare.png',
  Karma: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/4/4f/KarmaSquare.png',
  Karthus: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/e/e1/KarthusSquare.png',
  Kassadin: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/5/57/KassadinSquare.png',
  Katarina: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/a/ae/KatarinaSquare.png',
  Kayle: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/b/bd/KayleSquare.png',
  Kayn: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/3/37/KaynSquare.png',
  Kennen: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/6/69/KennenSquare.png',
  "Kha'Zix": 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/1/14/Kha%27ZixSquare.png',
  Kindred: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/6/6e/KindredSquare.png',
  Kled: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/e/ef/KledSquare.png',
  "Kog'Maw": 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/4/45/Kog%27MawSquare.png',
  LeBlanc: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/f/f1/LeBlancSquare.png',
  'Lee Sin': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/4/4f/Lee_SinSquare.png',
  Leona: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/5/54/LeonaSquare.png',
  Lillia: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/4/49/LilliaSquare.png',
  Lissandra: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/3/36/LissandraSquare.png',
  Lucian: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/1/1e/LucianSquare.png',
  Lulu: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/9/91/LuluSquare.png',
  Lux: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/0/01/LuxSquare.png',
  Malphite: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/6/6f/MalphiteSquare.png',
  Malzahar: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/a/a7/MalzaharSquare.png',
  Maokai: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/6/64/MaokaiSquare.png',
  'Master Yi': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/b/b2/Master_YiSquare.png',
  'Miss Fortune': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/9/9d/MissFortuneSquare.png',
  Mordekaiser: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/4/4d/MordekaiserSquare.png',
  Morgana: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/d/d8/MorganaSquare.png',
  Nami: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/d/d2/NamiSquare.png',
  Nasus: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/5/58/NasusSquare.png',
  Nautilus: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/b/b5/NautilusSquare.png',
  Neeko: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/8/88/NeekoSquare.png',
  Nidalee: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/7/7c/NidaleeSquare.png',
  Nocturne: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/6/65/NocturneSquare.png',
  'Nunu & Willump': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/b/be/Nunu_%26_WillumpSquare.png',
  Olaf: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/2/2b/OlafSquare.png',
  Orianna: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/b/b0/OriannaSquare.png',
  Ornn: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/3/31/OrnnSquare.png',
  Pantheon: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/9/9b/PantheonSquare.png',
  Poppy: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/e/e3/PoppySquare.png',
  Pyke: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/8/83/PykeSquare.png',
  Qiyana: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/c/ca/QiyanaSquare.png',
  Quinn: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/7/7c/QuinnSquare.png',
  Rakan: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/8/8b/RakanSquare.png',
  Rammus: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/7/7c/RammusSquare.png',
  "Rek'Sai": 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/3/3e/Rek%27SaiSquare.png',
  'Renata Glasc': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/c/c2/Renata_GlascSquare.png',
  Renekton: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/f/fc/RenektonSquare.png',
  Rengar: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/f/f1/RengarSquare.png',
  Rhaast: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/2/2e/RhaastSquare.png',
  Riven: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/4/46/RivenSquare.png',
  Rumble: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/1/13/RumbleSquare.png',
  Ryze: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/2/28/RyzeSquare.png',
  Sejuani: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/9/93/SejuaniSquare.png',
  Senna: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/2/21/SennaSquare.png',
  Sett: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/1/19/SettSquare.png',
  Shaco: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/9/93/ShacoSquare.png',
  Shen: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/d/d3/ShenSquare.png',
  Shyvana: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/f/f6/ShyvanaSquare.png',
  Singed: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/9/96/SingedSquare.png',
  Sion: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/6/61/SionSquare.png',
  Sivir: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/e/e1/SivirSquare.png',
  Skarner: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/8/80/SkarnerSquare.png',
  Sona: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/5/56/SonaSquare.png',
  Soraka: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/8/8d/SorakaSquare.png',
  Swain: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/8/8c/SwainSquare.png',
  Sylas: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/e/eb/SylasSquare.png',
  Syndra: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/6/65/SyndraSquare.png',
  'Tahm Kench': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/0/03/Tahm_KenchSquare.png',
  Taliyah: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/2/2d/TaliyahSquare.png',
  Talon: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/f/f9/TalonSquare.png',
  Taric: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/c/c4/TaricSquare.png',
  Teemo: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/0/04/TeemoSquare.png',
  Thresh: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/7/7b/ThreshSquare.png',
  Tristana: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/0/06/TristanaSquare.png',
  Trundle: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/c/c4/TrundleSquare.png',
  Tryndamere: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/5/5f/TryndamereSquare.png',
  'Twisted Fate': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/f/fb/Twisted_FateSquare.png',
  Twitch: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/7/79/TwitchSquare.png',
  Udyr: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/d/d1/UdyrSquare.png',
  Urgot: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/8/88/UrgotSquare.png',
  Valor: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/5/58/ValorSquare.png',
  Varus: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/c/c2/VarusSquare.png',
  Vayne: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/9/95/VayneSquare.png',
  Veigar: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/8/8f/VeigarSquare.png',
  "Vel'Koz": 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/0/05/Vel%27KozSquare.png',
  Vex: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/e/ef/VexSquare.png',
  Viego: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/3/3d/ViegoSquare.png',
  Viktor: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/a/a3/ViktorSquare.png',
  Vi: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/c/c0/ViSquare.png',
  Vladimir: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/7/75/VladimirSquare.png',
  Volibear: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/f/f9/VolibearSquare.png',
  Warwick: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/4/42/WarwickSquare.png',
  Wukong: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/6/6d/WukongSquare.png',
  Xayah: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/b/b5/XayahSquare.png',
  Xerath: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/7/7a/XerathSquare.png',
  'Xin Zhao': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/6/63/Xin_ZhaoSquare.png',
  Yasuo: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/c/c0/YasuoSquare.png',
  Yorick: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/d/d8/YorickSquare.png',
  Yuumi: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/7/70/YuumiSquare.png',
  Zac: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/8/81/ZacSquare.png',
  Zed: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/b/bb/ZedSquare.png',
  Zeri: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/8/85/ZeriSquare.png',
  Ziggs: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/5/55/ZiggsSquare.png',
  Zilean: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/a/ac/ZileanSquare.png',
  Zoe: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/b/b8/ZoeSquare.png',
  Zyra: 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/1/1a/ZyraSquare.png',
};

interface ChampionSkinSet {
  [key: string]: string[]
}
const skinSets: ChampionSkinSet = {
  Academy: ['Ahri', 'Darius', 'Ekko', 'Vladimir', 'Fiora', 'Ryze'],
  Albion: ['Morgana', 'Ezreal', 'Ashe', 'Kayle'],
  'Anima Squad': ['Vayne', 'Miss Fortune', 'Riven', 'Jinx', 'Sylas', 'Jinx'],
  Anniversary: ['Annie', 'Fiddlesticks'],
  'Arcade: Battle Bosses': ['Blitzcrank', 'Brand', 'Malzahar', 'Qiyana', 'Yasuo', 'Ziggs', 'Veigar'],
  'Arcade: Heroes': ['Ahri', 'Caitlyn', 'Corki', 'Ezreal', 'Hecarim', "Kai'Sa", 'Miss Fortune', 'Riven', 'Sona', 'Caitlyn'],
  Arcana: ['Ahri', 'Camille', 'Hecarim', 'Lucian', 'Rakan', 'Ryze', 'Tahm Kench', 'Xayah', 'Xerath'],
  Arcane: ['Caitlyn', 'Jayce', 'Jinx', 'Vi', 'Ekko'],
  Arcanists: ["Kog'Maw", 'Shaco', 'Zoe', 'Ziggs', 'Zoe', 'Lux'],
  Arclight: ['Brand', 'Varus', 'Vayne', "Vel'Koz", 'Yorick'],
  Justicar: ['Aatrox', 'Syndra'],
  'Ashen Knights': ['Pyke'],
  Astronauts: ['Bard', 'Corki', 'Gnar', 'Maokai', 'Poppy', 'Rammus', 'Teemo', 'Veigar', 'Nautilus'],
  'Battle Academia': ['Caitlyn', 'Ezreal', 'Garen', 'Jayce', 'Katarina', 'Leona', 'Lux', 'Wukong', 'Yone', 'Yuumi', 'Graves', 'Leona', 'Lux'],
  'Battle Queens': ['Diana', 'Janna', 'Katarina', 'Qiyana', 'Rell', 'Diana'],
  Battlecast: ["Kog'Maw", 'Nasus', 'Urgot', "Vel'Koz", 'Xerath', 'Zac', 'Skarner', "Cho'Gath", 'Viktor', 'Caitlyn', 'Illaoi', 'Jayce', 'Singed', 'Yorick'],
  'Bees!': ["Kog'Maw", 'Singed', 'Teemo', 'Malzahar', 'Ziggs', 'Heimerdinger', 'Nunu & Willump', 'Orianna', 'Yuumi'],
  'Bilgewater: Burning Tides': ['Rumble', 'Katarina', 'Swain', 'Tristana', 'Gangplank', 'Miss Fortune', 'Quinn', 'Twisted Fate', 'Graves', 'Fiddlesticks', 'Malphite', 'Twitch', 'Ryze', 'Garen', 'Aatrox'],
  'Bilgewater: Curse of the Drowned': ['Diana', 'Vladimir'],
  Blackfrost: ['Alistar', 'Anivia', "Rek'Sai", 'Renekton', 'Sion', "Vel'Koz"],
  'Blood Moon': ['Aatrox', 'Akali', 'Diana', 'Elise', 'Evelynn', 'Jhin', 'Kalista', 'Katarina', 'Kennen', 'Master Yi', 'Pyke', 'Shen', 'Sivir', 'Talon', 'Thresh', 'Tryndamere', 'Twisted Fate', 'Yasuo', 'Zilean', 'Aatrox'],
  Bloodstone: ['Hecarim', 'Vladimir', 'Renekton', 'Lissandra', 'Taric'],
  'Cafe Cuties': ['Annie', 'Bard', 'Gwen', 'Sivir', 'Soraka', 'Vladimir'],
  'Cats Versus Dogs': ['Nasus', 'Corki', 'Fizz', 'Maokai', 'Yorick', 'Fizz', 'Rengar', "Kog'Maw"],
  'Battle of the God-Kings': ['Darius', 'Garen'],
  Dawnbringer: ['Karma', 'Morgana', 'Nidalee', 'Soraka', 'Vex', 'Yone', 'Kayn'],
  Nightbringer: ['Aphelios', 'Kayn', 'Lee Sin', 'Lillia', 'Soraka', 'Tryndamere', 'Vladimir', 'Kayn', 'Lee Sin'],
  'Order Versus Chaos': ['Riven', 'Yasuo'],
  Forsaken: ['Jayce', 'Olaf'],
  'Star Wars': ['Master Yi', 'Jayce'],
  "Collector's Edition": ['Alistar', 'Kayle', 'Ryze'],
  Commando: ['Galio', 'Garen', 'Jarvan IV', 'Lux', 'Xin Zhao', 'Tristana', 'Gangplank'],
  'Cops and Robbers': ['Volibear', 'Trundle', 'Caitlyn', 'Vi', 'Twitch', 'Evelynn'],
  Riot: ['Blitzcrank', 'Graves', 'Kayle', 'Tristana', 'Nasus', 'Singed'],
  'Secret Agent': ['Miss Fortune', 'Xin Zhao'],
  Cottontail: ['Fizz', 'Teemo'],
  'Crime City': ['Braum', 'Graves', 'Jinx', 'Miss Fortune', 'Twitch', 'Gragas', 'Lee Sin'],
  'Crime City Nightmare': ['Akali', 'Darius', 'Shaco', 'Twisted Fate', 'Zyra'],
  Debonair: ['Brand', 'Draven', 'Ezreal', 'Galio', 'Jayce', 'LeBlanc', 'Leona', 'Malzahar', 'Master Yi', 'Vi', 'Zed', 'Brand'],
  'Crimson Elite': ['Riven', 'Talon'],
  'Crystal Rose': ['Akshan', 'Janna', 'Swain', 'Zyra'],
  'Withered Rose': ['Elise', 'Syndra', 'Talon', 'Zeri'],
  'Culinary Masters': ['Pantheon', 'Leona', 'Galio', 'Olaf', 'Tahm Kench', 'Sivir', 'Akali', 'Morgana'],
  'Cyber Pop': ['Akshan', 'Zoe'],
  'Day Job': ['Jax', 'Udyr', 'Blitzcrank', 'Dr. Mundo', 'Tristana', 'Fizz', 'Janna', 'Zilean', 'Heimerdinger', 'Trundle', 'Sion', 'Alistar', 'LeBlanc', 'Draven', 'Gangplank'],
  'Definitely Not': ['Blitzcrank', 'Udyr', "Vel'Koz", 'Draven'],
  'Demacia Vice': ['Garen', 'Lucian'],
  Demonic: ['Vi', 'Galio', 'Tristana', 'Fizz', 'Teemo'],
  'Dragon World': ['Galio', 'Mordekaiser', 'Swain', 'Udyr', 'Zyra', 'Heimerdinger', 'Lulu', 'Tristana', 'Braum', 'Diana', 'Jarvan IV', 'Kayle', 'Olaf', 'Pantheon', 'Trundle', 'Twitch', 'Vayne', 'Xin Zhao'],
  Dragonmancers: ['Yasuo', 'Volibear', 'Brand', 'Ashe', "Kai'Sa", 'Sett', 'Volibear', 'Sett', 'Thresh', 'Aurelion Sol', 'Lee Sin', 'Karma', 'Yasuo'],
  Dreadknights: ['Garen', 'Nasus'],
  Dunkmaster: ['Darius', 'Ivern'],
  Coven: ['Ahri', 'Ashe', 'Camille', 'Cassiopeia', 'Evelynn', 'LeBlanc', 'Lissandra', 'Morgana', 'Zyra', 'Ivern', 'Malphite', 'Nocturne', 'Warwick', 'LeBlanc', 'Zyra'],
  'Death Blossom': ['Elise', "Kha'Zix"],
  Eclipse: ['Aatrox', 'Leona', 'Senna', 'Senna', 'Leona', 'Sejuani', 'Sivir', 'Kayle'],
  Elderwood: ['Soraka', 'Ahri', 'Azir', 'Bard', 'Gnar', 'Hecarim', 'LeBlanc', 'Ornn', 'Rakan', "Rek'Sai", 'Veigar', 'Xayah', 'Taric', 'Ivern', 'Malphite', 'Nocturne', 'Warwick'],
  Eternum: ['Cassiopeia', 'Nocturne', "Rek'Sai"],
  Cosmic: ['Lux', 'Master Yi', 'Hecarim', 'Rakan', 'Xin Zhao', 'Nami', 'Vladimir', 'Xayah', 'Lulu', 'Anivia', 'Varus', 'Nidalee', 'Illaoi', 'Ashe', 'Kassadin', 'Skarner'],
  'Dark Star': ['Jhin', 'Lissandra', 'Lux', "Cho'Gath", 'Jarvan IV', 'Karma', "Kha'Zix", 'Malphite', 'Mordekaiser', 'Orianna', 'Shaco', 'Thresh', 'Varus', 'Xerath', 'Malphite'],
  Fables: ['Diana', 'Morgana', 'Veigar', "Cho'Gath", 'Sona', 'Nami', 'Nunu & Willump', 'Cassiopeia', 'Leona'],
  'Forgotten Depths': ['Nautilus', 'Fizz', 'Syndra', 'Malphite', 'Kassadin', "Kog'Maw", 'Nami', 'Thresh'],
  Freljord: ['Ashe', 'Rammus', 'Sylas', 'Taliyah'],
  Galactic: ['Azir', 'Nasus', 'Renekton'],
  Glacial: ['Ezreal', 'Shen', 'Nocturne', 'Malphite', 'Olaf', 'Shyvana'],
  Goth: ['Amumu', 'Annie', 'Orianna'],
  'Guardian of the Sands': ['Janna', "Kha'Zix", 'Rammus', 'Rengar', 'Ryze', 'Skarner', 'Xerath', 'Fiddlesticks', 'Pyke', 'Ekko', 'Katarina'],
  'Death Sworn': ['Katarina', 'Viktor', 'Zed', 'Hecarim', 'Soraka', 'Twisted Fate', 'Wukong'],
  'Trick-or-Treat': ['Elise', 'Fiora', 'Janna', 'Miss Fortune', 'Morgana', 'Nami', 'Nidalee', 'Poppy', 'Syndra', 'Tristana', 'Yuumi', 'Kassadin', 'Kled', 'Annie', 'Maokai', 'Zyra', 'Nocturne', 'Hecarim', 'Katarina', 'Fizz', 'Teemo', 'Dr. Mundo', 'Vladimir', 'Miss Fortune', 'Morgana', 'Amumu', 'Fiddlesticks', 'LeBlanc', 'Ekko', 'Twisted Fate', 'Blitzcrank'],
  'Zombies VS Slayers': ['Brand', 'Nunu & Willump', 'Ryze', 'Jinx', 'Pantheon'],
  Headhunter: ['Akali', 'Caitlyn', 'Master Yi', 'Nidalee', 'Rengar'],
  Heartbreakers: ['Vi', 'Fiora', 'Ashe', 'Jinx', 'Lucian', 'Orianna', 'Quinn', 'Varus', 'Vayne', 'Yuumi', 'Annie', 'Rakan', 'Sona', 'Xayah'],
  'Heavy Metal': ['Blitzcrank', 'Viktor', 'Jayce', 'Pantheon', 'Rammus', 'Nunu & Willump'],
  Hextech: ['Alistar', 'Amumu', 'Anivia', 'Annie', 'Galio', 'Janna', 'Jarvan IV', 'Kassadin', "Kog'Maw", 'Malzahar', 'Nocturne', 'Poppy', 'Rammus', 'Renekton', 'Sejuani', 'Singed', 'Sion', 'Swain', 'Tristana', 'Ziggs'],
  'High Noon': ['Fiddlesticks', 'Miss Fortune', 'Cassiopeia', 'Ashe', 'Darius', 'Hecarim', 'Irelia', 'Jhin', 'Katarina', 'Leona', 'Lucian', 'Mordekaiser', 'Samira', 'Senna', 'Sion', 'Tahm Kench', 'Talon', 'Thresh', 'Twisted Fate', 'Twitch', 'Urgot', 'Varus', 'Viktor', 'Yasuo', 'Alistar', 'Talon', 'Skarner', 'Caitlyn', "Kog'Maw"],
  'High Society': ['Nasus', 'Vayne', "Cho'Gath", 'Gnar', 'Vladimir'],
  'Immortal Journey': ['Irelia', 'Talon', 'Master Yi', 'Lee Sin', 'Jax', 'Morgana', 'Riven', 'Janna', 'Fiora', 'Nami', 'Riven'],
  Infernal: ['Aurelion Sol', 'Maokai', 'Warwick', 'Ahri', 'Akali', 'Alistar', 'Amumu', 'Diana', 'Galio', 'Karthus', 'Kennen', 'Mordekaiser', 'Nasus', 'Shen', 'Varus', "Vel'Koz", 'Rammus', 'Malphite', 'Renekton', 'Xerath', 'Kindred', 'Wukong', 'Zyra'],
  Invaders: ['Heimerdinger', 'Corki'],
  Lancer: ['Blitzcrank', 'Blitzcrank', 'Wukong', 'Hecarim'],
  Pharaoh: ['Amumu', 'Nasus', 'Nidalee'],
  Luchador: ['Gnar', 'Dr. Mundo', 'Volibear', 'Braum'],
  'Lunar Beast': ['Alistar', 'Annie', 'Aphelios', 'Darius', 'Fiora', 'Jarvan IV', 'Viego', 'Fiora'],
  'Lunar Revel': ['Tahm Kench', 'Lee Sin', 'Sona', 'Wukong', 'Cassiopeia', 'Lux', 'Diana', 'Nasus', 'Warwick', 'Caitlyn', 'Morgana', 'Sylas', 'Wukong'],
  'Lunar Revel: Firecracker': ['Corki', 'Diana', 'Jinx', 'Sejuani', 'Sett', 'Teemo', 'Tristana', 'Vayne', 'Xin Zhao', "Kog'Maw", 'Annie', 'Vayne'],
  'Lunar Revel: Warring Kingdoms': ['Riven', 'Talon', 'Azir', 'Garen', 'Jarvan IV', 'Katarina', 'Nidalee', 'Tryndamere', 'Vi', 'Xin Zhao'],
  'Mecha Kingdoms': ['Draven', 'Garen', 'Jax', 'Leona', 'Sett', 'Garen'],
  'Mad Scientists': ['Singed', 'Ziggs'],
  Marauder: ['Alistar', 'Ashe', 'Kalista', 'Kled', 'Olaf', 'Warwick', 'Xin Zhao'],
  Warden: ['Gragas', 'Jax', 'Karma', 'Nautilus', 'Quinn', 'Sivir'],
  Kaiju: ['Urgot'],
  Mecha: ['Aatrox', 'Aurelion Sol', "Kha'Zix", 'Malphite', 'Rengar', 'Sion'],
  Medieval: ['Poppy', 'Tryndamere', 'Amumu', 'Twitch', 'Ashe', 'Kled', 'Lux', 'Veigar'],
  'K/DA': ['Ahri', 'Akali', 'Evelynn', "Kai'Sa", 'Ahri', 'Ahri', 'Akali', 'Evelynn', "Kai'Sa"],
  'K/DA ALL OUT': ['Ahri', 'Akali', 'Evelynn', "Kai'Sa", 'Seraphine', 'Seraphine', 'Seraphine', "Kai'Sa"],
  Pentakill: ['Karthus', 'Kayle', 'Mordekaiser', 'Olaf', 'Sona', 'Yorick'],
  'Pentakill III: The Lost Chapter': ['Viego', 'Karthus', 'Kayle', 'Mordekaiser', 'Olaf', 'Sona', 'Yorick'],
  'True Damage': ['Qiyana', 'Senna', 'Yasuo', 'Akali', 'Ekko', 'Qiyana', 'Senna', 'Yasuo'],
  Odyssey: ['Zed', 'Aatrox', 'Jinx', 'Karma', 'Kayn', "Kha'Zix", 'Malphite', 'Sivir', 'Sona', 'Twisted Fate', 'Yasuo', 'Ziggs'],
  'Omega Squad': ['Fizz', 'Teemo', 'Tristana', 'Twitch', 'Veigar'],
  'Omen of the Dark': ['Singed', 'Lissandra', 'Nocturne', 'Dr. Mundo', 'Warwick', 'Kayle', 'Fiddlesticks', 'Yorick'],
  'Order of the Lotus': ['Irelia', 'Karma'],
  Papercraft: ['Anivia', 'Nunu & Willump'],
  PAX: ['Sivir', 'Jax', 'Sivir', 'Twisted Fate'],
  Phoenixmancers: ['Xayah', 'Anivia', 'Seraphine', 'Xayah'],
  'Piltover Customs': ['Corki', 'Blitzcrank', 'Heimerdinger'],
  'Pool Party': ['Braum', 'Caitlyn', 'Draven', 'Fiora', 'Gangplank', 'Graves', 'Heimerdinger', 'Jarvan IV', 'Lee Sin', 'Leona', 'Lulu', 'Miss Fortune', 'Orianna', "Rek'Sai", 'Renekton', 'Sett', 'Syndra', 'Taliyah', 'Taric', 'Zac', 'Ziggs', 'Zoe', 'Dr. Mundo', 'Singed'],
  Porcelain: ['Amumu', 'Kindred', 'Lissandra', 'Lux', 'Ezreal', 'Lux'],
  'Prehistoric Hunters': ['Draven', 'Sejuani', 'Tryndamere', 'Shyvana', 'Anivia', "Cho'Gath", 'Renekton', 'Ryze'],
  Program: ['Blitzcrank', 'Camille', 'LeBlanc', 'Lissandra', 'Nami', 'Soraka'],
  PROJECT: ['Irelia', 'Sylas', 'Zed', 'Akali', 'Ashe', 'Ekko', 'Fiora', 'Irelia', 'Jhin', 'Jinx', 'Katarina', 'Leona', 'Lucian', 'Mordekaiser', 'Pyke', 'Renekton', 'Sejuani', 'Senna', 'Sylas', 'Varus', 'Vayne', 'Vi', 'Warwick', 'Yasuo', 'Zed', 'Master Yi'],
  'Arctic Ops': ['Gragas', 'Kennen', 'Varus', 'Caitlyn', 'Swain', 'Volibear'],
  'Black Rose Group': ['Kayle', 'Pyke', 'Samira', 'Viktor', 'Zed'],
  PsyOps: ['Ezreal', 'Ezreal', 'Master Yi', 'Shen', 'Sona', 'Vi'],
  Praetorian: ['Fiddlesticks', 'Graves'],
  Pulsefire: ['Lucian', 'Thresh', 'Caitlyn', 'Ekko', 'Ezreal', 'Fiora', 'Lucian', 'Pantheon', 'Riven', 'Shen', 'Thresh', 'Twisted Fate'],
  'Rift Hospital': ['Kennen', 'Akali', 'Shen'],
  'Rift Quest': ['Sion', 'Bard', 'Braum', 'Nunu & Willump', 'Gragas', 'Jayce', 'Karthus', 'Mordekaiser', 'Dr. Mundo', 'Garen', 'Ryze', 'Sejuani', 'Talon', 'Taric', 'Twitch', 'Varus', 'Veigar'],
  'Road Warrior': ['Brand', 'Rumble', 'Veigar', 'Heimerdinger', 'Warwick', 'Trundle', 'Miss Fortune', 'Pantheon'],
  Vandal: ['Brand', 'Gragas', 'Jax', 'Twitch', 'Vladimir'],
  'Shan Hai Scrolls': ["Cho'Gath", 'Jhin', 'Nautilus', 'Neeko'],
  Shockblade: ['Kassadin', 'Qiyana', 'Shen', 'Zed'],
  'Silver Age': ['Singed', 'Darius', 'Tryndamere', 'Brand', 'Warwick', 'Irelia', 'Quinn', 'Kennen', 'Teemo', 'Veigar', 'Dr. Mundo'],
  'Snow Day': ['Bard', 'Gnar', 'Graves', 'Malzahar', 'Singed', 'Syndra', 'Ziggs'],
  'Snowdown Showdown': ['Jinx', 'Veigar', 'Miss Fortune', 'Tristana', 'Maokai', 'Teemo', 'LeBlanc', 'Shaco', 'Zilean', 'Amumu', "Kog'Maw", 'Braum', 'Draven', 'Gragas', 'Sona', 'Katarina', 'Nidalee', 'Heimerdinger', 'Nunu & Willump'],
  'Winter Wonder': ['Fiddlesticks', 'Irelia', 'Annie', 'Dr. Mundo', 'Twitch', 'Sejuani', 'Poppy', 'Master Yi', 'Sivir', 'Karma', 'Lulu', 'Neeko', 'Orianna', 'Soraka'],
  'Soccer Cup': ['Akali', 'Blitzcrank', 'Maokai', 'Lee Sin', 'Katarina', 'Twisted Fate', 'Ezreal', 'Lucian', 'Gragas', 'Alistar', 'Rammus'],
  'Space Groove': ['Lulu', 'Blitzcrank', 'Gwen', 'Lulu', 'Lux', 'Nasus', 'Nunu & Willump', 'Rumble', 'Samira'],
  Akana: ['Cassiopeia', 'Lillia', 'Riven', 'Thresh', 'Vayne'],
  Kanmei: ['Teemo', 'Ahri', 'Kindred', 'Teemo', 'Yasuo', 'Yone'],
  'Star Guardian': ['Urgot'],
  'Star Guardian Season 1': ['Lulu', 'Lux', 'Janna', 'Jinx', 'Lulu', 'Lux', 'Poppy'],
  'Star Guardian Season 2': ['Ezreal', 'Miss Fortune', 'Soraka', 'Soraka', 'Ahri', 'Ezreal', 'Miss Fortune', 'Soraka', 'Syndra'],
  'Star Guardian Season 3': ['Neeko', 'Neeko', 'Rakan', 'Xayah', 'Zoe'],
  'Steel Legion': ['Garen', 'Lux'],
  Dreadnova: ['Darius', 'Gangplank'],
  'Steel Valkyries': ['Renata Glasc', 'Kayle', 'Morgana', "Kai'Sa", 'Miss Fortune'],
  Highstakes: ['Ezreal', 'Twisted Fate', 'Mordekaiser', 'Syndra', 'Shaco'],
  Storybook: ['Annie', 'Warwick', "Kog'Maw", 'Vladimir', 'Shaco', 'Annie'],
  'Sugar Rush': ['Lulu', 'Ivern', 'Fiddlesticks', 'Poppy', 'Braum', 'Evelynn', 'Ziggs', 'Zilean'],
  'Super Galaxy': ['Annie', 'Elise', 'Fizz', 'Gnar', 'Kindred', 'Nidalee', 'Rumble', 'Shyvana'],
  Tango: ['Evelynn', 'Twisted Fate'],
  Ruined: ['Gangplank', 'Pantheon', 'Draven', 'Karma', 'Miss Fortune', 'Pantheon', 'Shyvana', 'Yasuo', 'Thresh'],
  'Sentinels of Light': ['Diana', 'Graves', 'Irelia', 'Olaf', 'Pyke', 'Rengar', 'Riven', 'Vayne'],
  'Thunder Lord': ['Ornn', 'Volibear'],
  'Toy Box': ['Gnar', 'Nunu & Willump', 'Alistar', "Kog'Maw", 'Poppy', 'Renekton', 'Orianna', 'Kennen', 'Gangplank'],
  Traditional: ['Karma', 'Lee Sin', 'Sejuani', 'Trundle'],
  'Winter Sports': ['Veigar', 'Kassadin', 'Corki', 'Anivia', 'Jax', 'Fiddlesticks', 'Amumu', 'Twitch'],
  Woad: ['Kayle', 'Morgana', 'Ashe', 'Darius', 'Quinn'],
  'Wonders of the World': ['Sejuani', 'Ahri', 'Anivia', 'Shaco', 'Lee Sin', 'Pantheon', 'Gragas', 'Renekton', 'Teemo', 'Malphite', 'Karthus', 'Gangplank', 'Tryndamere', 'Ryze', 'Tryndamere', 'Xin Zhao'],
  Challenger: ['Ahri', 'Nidalee'],
  Conqueror: ['Alistar', 'Jax', 'Karma', 'Nautilus', 'Varus', 'Jax'],
  Victorious: ['Aatrox', 'Blitzcrank', 'Elise', 'Graves', 'Janna', 'Jarvan IV', 'Lucian', 'Maokai', 'Morgana', 'Orianna', 'Sivir'],
  'World Champions: 2011': ['Corki', 'Gragas', 'Janna', 'Jarvan IV', 'Karthus'],
  'World Champions: 2012': ['Ezreal', 'Nunu & Willump', 'Orianna', 'Shen', 'Dr. Mundo'],
  'World Champions: 2013': ['Jax', 'Lee Sin', 'Vayne', 'Zed', 'Zyra'],
  'World Champions: 2014': ['Rengar', 'Singed', 'Talon', 'Thresh', 'Twitch'],
  'World Champions: 2015': ['Alistar', 'Azir', 'Elise', 'Kalista', 'Renekton', 'Ryze'],
  'World Champions: 2016': ['Ekko', 'Jhin', 'Nami', 'Olaf', 'Syndra', 'Zac'],
  'World Champions: 2017': ['Ezreal', 'Gnar', 'Jarvan IV', 'Rakan', 'Taliyah', 'Xayah'],
  'World Champions: 2018': ['Camille', 'Fiora', 'Irelia', "Kai'Sa", 'LeBlanc', 'Rakan'],
  'World Champions: 2019': ['Gangplank', 'Lee Sin', 'Malphite', 'Thresh', 'Vayne'],
  'World Champions: 2020': ['Jhin', 'Kennen', 'Leona', 'Nidalee', 'Twisted Fate'],
  'World Championship': ['Ashe', 'Kalista', "Kha'Zix", 'LeBlanc', 'Riven', 'Ryze', 'Shyvana', 'Thresh', 'Zed', 'Riven', 'Jarvan IV'],
  Worldbreaker: ['Karma', 'Hecarim', 'Malzahar', 'Maokai', 'Nasus', 'Nautilus', 'Sion', 'Trundle'],
  American: ['Anivia', 'Karthus', 'Ryze'],
  Arabian: ['Malzahar', 'Akali'],
  Baron: ['Veigar', 'Corki'],
  Brazilian: ['Anivia', 'Nami', 'Gangplank'],
  Disguise: ['Galio', 'Udyr', 'Gnar', 'Veigar', 'Nunu & Willump', 'Maokai', 'Yorick', 'Alistar', 'Ezreal', 'Lulu', 'Lux', 'Miss Fortune', 'Soraka', 'Urgot', 'Tristana', 'Rengar', 'Annie', 'Tahm Kench', 'Warwick', 'Nami', 'Corki', 'Warwick'],
  'Double Name': ['Bard', 'Draven', 'Dr. Mundo'],
  'Gladiator Era': ['Draven', 'Jax', 'Xin Zhao'],
  'Hired Gun': ['Graves', 'Lucian'],
  Jurassic: ["Cho'Gath", "Kog'Maw"],
  Musketeer: ['Twisted Fate', 'Fiora'],
  Nightmare: ["Cho'Gath", 'Tryndamere'],
  Panda: ['Annie', 'Teemo'],
  Prestigious: ['LeBlanc', 'Twisted Fate'],
  Prom: ['Amumu', 'Annie'],
  Reaper: ['Karthus', 'Hecarim', 'Soraka'],
  Rune: ['Skarner', 'Xerath'],
  Soulhunter: ['Kayn', 'Vayne', 'Vladimir'],
  Spectral: ['Fiddlesticks', 'Gangplank'],
  'Surprise Party': ['Amumu', 'Fiddlesticks'],
  Void: ['Fizz', 'Nocturne', 'Illaoi'],
  Waterloo: ['Gangplank', 'Miss Fortune'],
  'Web Browser': ['Rammus', 'Ezreal', 'Ahri', 'Caitlyn'],
  Workshop: ['Nunu & Willump', 'Shaco'],
  'World Champions: 2021': ['Aphelios', 'Graves', 'Viego', 'Yuumi', 'Zoe'],
};

const findThemes = (champions: string[]) => {
  if (champions.length === 0) {
    return [];
  }
  const answers: string[] = [];
  Object.keys(skinSets).forEach((k) => {
    const champs = skinSets[k];
    let allIn = true;
    champions.forEach((c) => {
      if (!champs.includes(c)) {
        allIn = false;
      }
    });
    if (allIn) {
      answers.push(k);
    }
  });
  return answers;
};

const App = () => {
  const [champs, setChamps] = useState<string[]>([]);
  return (
    <>
      <Container>
        {findThemes(champs).map((champ) => (
          <Typography gutterBottom variant="h5" component="div">
            {champ}
          </Typography>
        ))}
      </Container>
      <Container>
        <Grid container>
          {Object.entries(squareChampionImages).map((entry) => (
            <Grid item xs={1}>
              <Card>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    image={entry[1]}
                    alt={entry[0]}
                    onClick={() => {
                      if (!champs.includes(entry[0])) {
                        setChamps([...champs, entry[0]]);
                      } else {
                        setChamps(champs.filter((c) => c !== entry[0]));
                      }
                    }}
                  />
                  <CardContent>
                    <Button
                      variant={champs.includes(entry[0]) ? 'contained' : 'outlined'}
                      onClick={() => {
                        if (!champs.includes(entry[0])) {
                          setChamps([...champs, entry[0]]);
                        } else {
                          setChamps(champs.filter((c) => c !== entry[0]));
                        }
                      }}
                    >
                      {entry[0]}
                    </Button>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default App;
