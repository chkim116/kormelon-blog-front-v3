import {
  CssBaseline,
  ThemeProvider,
  responsiveFontSizes,
  createTheme,
} from '@mui/material';
import { Provider } from 'react-redux';
import store from '../src/common/store';
import '../src/shared/styles/global.css';
import { getMuiTheme } from '../src/shared/styles/theme';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

const theme = getMuiTheme(true);

export const decorators = [
  (Story) => (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Story />
      </ThemeProvider>
    </Provider>
  ),
];
