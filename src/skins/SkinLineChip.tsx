import { Chip } from '@mui/material';
import React from 'react';

// DRAWER should show either SKIN LINES or COLORS or BACK
// then each page can either play around with one dimension, but not two
// or go back to the previous page
// that way the drawer is always there with one title and it's pretty
// the drawer itself can be included on every page rather than at the App level
// pass down props per page as needed
// probably keep the hide/show at least until mobile works

// maybe have a different page for chromas vs skins, a link at least for sure
// but it works as is so probably just make the link at the top toggle the right drawer
// actually the drawer shouldn't keep track of state, they should be separate pages

// home page: show all champions
// http://localhost:3000
// DRAWER : show all skin lines for selected champions
// TOGGLE : no

// champion page: show skins for champion
// http://localhost:3000/champions/21
// DRAWER : start by showing skin lines
// TOGGLE : allow and show chroma options for single champion

// skin line page: show skins for skin line
// http://localhost:3000/skinLines/156
// DRAWER : try showing just the chromas possible for the skin line
// TOGGLE : allow I think (not sure because people will go from home page here and it's nice to quickly go from one line to next)
// so maybe we keep the toggle just for this page alone
// navigate to different chroma color pages
// navigate to individual skin page

// chroma page: show example chromas for eg sapphire
// http://localhost:3000/colors/DF9117_DF9117/champions/_
// DRAWER : show chroma options for everything
// TOGGLE : no

// chroma + champion selected page: show eg obsidian for akali + alistar
// http://localhost:3000/colors/FFEE59_FFEE59/champions/103_166
// DRAWER : show chroma options
// TOGGLE : no

// chroma skin line page: show eg all green lunar beast chromas
// http://localhost:3000/skinLines/156/colors/B6E084_B6E084
// DRAWER : show chroma options for skin line
// TOGGLE none
// navigate to lunar beast page
// navigate to different chroma color pages

// skin page: maybe show the different chromas
// http://localhost:3000/skins/21031
// DRAWER : show SKIN LINE CHROMAS and call it that (chroma cards no longer need links)
// (and chroma cards here should just say the names not the skin line)
// TOGGLE : none
// top three cards can be (1) current skin (2) champion (3) skin line
// with maybe a line or something between first and subsequent rows
// navigate to champion page
// navigate to skin line page
// navigate to specific chroma color page

const SkinLineChip = () => {
  return (
    <Chip label="Bees" onDelete={() => null} />
  );
};

export default SkinLineChip;