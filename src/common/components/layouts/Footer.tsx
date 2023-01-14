import GitHub from '@mui/icons-material/GitHub';
import RssFeed from '@mui/icons-material/RssFeed';
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
      display="flex"
      flexDirection={{
        xs: 'column',
        md: 'row',
      }}
      alignItems="center"
      justifyContent="space-between"
      gap="2em"
      p="2em"
      maxWidth="lg"
      width="100%"
      m="0 auto"
    >
      <Box display="flex" gap={2} alignItems="center">
        <Typography variant="body2">today: {today}</Typography>
        <Typography variant="body2">total: {total}</Typography>
      </Box>
      <Box display="flex" gap={2} alignItems="center">
        <Box>&copy; 2022 kormelon</Box>

        <Box>
          <IconButton
            LinkComponent="a"
            target="_blank"
            href="https://github.com/chkim116/kormelon-blog-front-v3"
          >
            <GitHub />
          </IconButton>
          <IconButton LinkComponent="a" href="/rss" target="_blank">
            <RssFeed />
          </IconButton>
        </Box>
      </Box>
    </Box>
  </Box>
);
