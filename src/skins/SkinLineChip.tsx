import { Chip } from '@mui/material';
import React from 'react';

// * chroma card should link to the skin page for that chroma
// * maybe add the color grid to the champion page
// * browse drawer can show a miniature champion selection row
// * bread crumbs everywhere
// * some skin lines have more than one skin for a given champion

const SkinLineChip = () => (
  <Chip label="Bees" onDelete={() => null} />
);

export default SkinLineChip;
