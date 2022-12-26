import { GitHub, RssFeed } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import { ViewModel } from '@shared/models';

interface FooterProps extends ViewModel {}

export const Footer = ({ today, total }: FooterProps) => (
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
        justifyContent: 'space-between',
        gap: '2em',
        p: '2em',
        maxWidth: 'xl',
        width: '100%',
        m: '0 auto',
      }}
    >
      <Box display="flex" gap={2} alignItems="center">
        <Typography variant="body2">today: {today}</Typography>
        <Typography variant="body2">total: {total}</Typography>
      </Box>
      <Box display="flex" gap={2} alignItems="center">
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
  </Box>
);
