import { ReactNode, useEffect, useMemo, useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import { CssBaseline } from '@mui/material';
import { STORAGE_THEME_KEY } from '@common/constants';
import { useAppDispatch, useAppSelector } from '@common/store';
import { tokenProvider } from '@core/tokenProvider';
import { authSlice, selIsLogged, selUserData } from '@shared/stores/auth';
import { getMuiTheme } from '@shared/styles/theme';
import { feedbackService } from '../../common/components/Feedback';
import { Footer } from '../../common/components/layouts/Footer';
import { Header } from '../../common/components/layouts/Header';
import { Main } from '../../common/components/layouts/Main';

const Wrap = styled.div`
  margin-top: 64px;
`;

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selUserData);
  const isLogged = useAppSelector(selIsLogged);

  const [themeMode, setThemeMode] = useState(false);

  const theme = useMemo(() => getMuiTheme(themeMode), [themeMode]);

  const handleLogout = () => {
    dispatch(authSlice.actions.logout());
    feedbackService('success', '로그아웃 완료');
  };

  const handleThemeChange = () => {
    setThemeMode((prev) => {
      const currentTheme = !prev ? 'light' : 'dark';

      tokenProvider().set(STORAGE_THEME_KEY, currentTheme);

      return !prev;
    });
  };

  useEffect(() => {
    const theme = tokenProvider().get(STORAGE_THEME_KEY);
    setThemeMode(theme === 'light');
  }, []);

  useEffect(() => {
    dispatch(authSlice.actions.initialize());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Wrap>
        <Header
          themeMode={themeMode}
          isLogged={isLogged}
          user={user}
          onLogout={handleLogout}
          onThemeChange={handleThemeChange}
        />
        <Main>{children}</Main>
        <Footer />
      </Wrap>
    </ThemeProvider>
  );
};
