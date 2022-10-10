import { ReactNode } from 'react';
import { Box } from '@mui/material';

interface MainProps {
  children: ReactNode;
}

export const Main = ({ children }: MainProps) => (
  <Box
    component="main"
    sx={{
      bgColor: 'background.paper',
      width: '100%',
      height: '100%',
      minHeight: '100vh',
    }}
  >
    {children}
  </Box>
);
