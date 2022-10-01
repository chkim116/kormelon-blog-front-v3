import { ReactNode, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { ThemeProvider } from '@emotion/react';
import { createTheme, CssBaseline } from '@mui/material';
import { Footer } from './Footer';
import { Header } from './Header';
import { Main } from './Main';

const Wrap = styled.div`
  margin-top: 64px;
`;

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [themeMode, setThemeMode] = useState(false);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeMode ? 'light' : 'dark',
        },
      }),
    [themeMode],
  );

  const handleThemeChange = () => {
    setThemeMode((prev) => !prev);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Wrap>
        <Header themeMode={themeMode} onThemeChange={handleThemeChange} />
        <Main>{children}</Main>
        <Footer />
      </Wrap>
    </ThemeProvider>
  );
};
