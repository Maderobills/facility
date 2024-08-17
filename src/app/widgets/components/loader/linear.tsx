import * as React from 'react';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';

export default function LinearLoader() {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <LinearProgress
        sx={{
          backgroundColor: '#d6d9d4a0',
          '& .MuiLinearProgress-bar': {
            backgroundColor: '#124E66',
          },
        }}
      />
    </Stack>
  );
}
