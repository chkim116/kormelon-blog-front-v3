import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import { CssBaseline } from '@mui/material';
import { STORAGE_THEME_KEY } from '@common/constants';
import { useAppDispatch, useAppSelector } from '@common/store';
import { tokenProvider } from '@core/tokenProvider';
import { authSlice, selIsLogged, selUserData } from '@shared/stores/auth';
import { getMuiTheme } from '@shared/styles/theme';
import {
  effNotificationLoad,
  selNotifications,
} from '@shared/stores/notification';
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

export interface HeaderHandle {
  hide: () => void;
  open: () => void;
}

export const Layout = ({ children }: LayoutProps) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selUserData);
  const isLogged = useAppSelector(selIsLogged);
  const notifications = useAppSelector(selNotifications);

  const refHeader = useRef<HeaderHandle>(null);
  const refCurrentScrollY = useRef<number>(0);

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
    dispatch(effNotificationLoad());
  }, [dispatch]);

  const handleScroll = useCallback(() => {
    if (50 > window.scrollY) {
      return refHeader.current?.open();
    }

    if (refCurrentScrollY.current > window.scrollY) {
      refHeader.current?.open();
    } else {
      refHeader.current?.hide();
    }

    refCurrentScrollY.current = window.scrollY;
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Wrap>
        {/* TODO: 헤더 분할 */}
        <Header
          notifications={notifications}
          ref={refHeader}
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
