import { GitHub, RssFeed } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';

export const Footer = () => (
  <Box
    component="footer"
    width="100%"
    sx={{
      borderTop: '1px solid',
      borderTopColor: 'divider',
    }}
  >
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: '2em',
        p: '2em',
        maxWidth: 'xl',
        width: '100%',
        m: '0 auto',
      }}
    >
      <Box>&copy; 2022 kormelon</Box>

      <Box>
        <IconButton>
          <GitHub />
        </IconButton>
        <IconButton>
          <RssFeed />
        </IconButton>
      </Box>
    </Box>
  </Box>
);
