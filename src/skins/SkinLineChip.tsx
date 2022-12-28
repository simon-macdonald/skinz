import { Chip } from '@mui/material';
import React from 'react';

// * chroma card should link to the skin page for that chroma
// * maybe add the color grid to the champion page
// * skin line link that sometimes isn't should just always be a link
// * browse drawer can show a miniature champion selection row
// * bread crumbs everywhere

const SkinLineChip = () => (
  <Chip label="Bees" onDelete={() => null} />
);

export default SkinLineChip;
