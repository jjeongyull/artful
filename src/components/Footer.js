import React from 'react';
import { Box, Typography } from '@mui/material';

function Footer() {
  return (
    <Box sx={{ bgcolor: '#f5f5f5', py: 3, mt: 8, textAlign: 'center' }}>
      <Typography variant="body2" color="textSecondary">
        © 2025 Artful. All rights reserved.
      </Typography>
    </Box>
  );
}

export default Footer;
