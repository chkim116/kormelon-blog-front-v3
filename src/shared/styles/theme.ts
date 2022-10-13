import { responsiveFontSizes, createTheme } from '@mui/material';

export function getMuiTheme(mode: boolean) {
  return responsiveFontSizes(
    createTheme({
      palette: {
        mode: mode ? 'light' : 'dark',
      },
      typography: {
        body1: {
          fontSize: '1.2rem',
        },
        fontFamily: [
          'Pretendard',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(','),
      },
    }),
  );
}
