import { Chip } from '@mui/material';
import React from 'react';

// * chroma card should link to the skin page for that chroma
// * maybe add the color grid to the champion page
// * skin line link that sometimes isn't should just always be a link

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

const SkinLineChip = () => (
  <Chip label="Bees" onDelete={() => null} />
);

export default SkinLineChip;
