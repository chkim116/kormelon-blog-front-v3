'use client';
import { useRef } from 'react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import {
  ThemeModeType,
  LayoutNavbar,
  LayoutNotificationMenu,
  LayoutSearchModal,
  LayoutSearchModalHandle,
} from '@shared/components/layout';
import { useAppDispatch, useAppSelector } from '@shared/stores';
import { actAuthLogout, selUserData } from '@shared/stores/auth';
import { selNotifications } from '@shared/stores/notification';

export function RootLayoutNavbarClientContainer() {
  const dispatch = useAppDispatch();
  const { theme, setTheme } = useTheme();

  const user = useAppSelector(selUserData);
  const notifications = useAppSelector(selNotifications);
  const router = useRouter();

  const refSearchModal = useRef<LayoutSearchModalHandle>(null);

  const handleChangeTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleActionDropdown = (key: string) => {
    if (key === 'logout') {
      dispatch(actAuthLogout());
      return;
    }

    router.push(key);
  };

  const handleClickSearchMode = () => {
    refSearchModal.current?.open().then((value) => {
      router.push(`/search?keyword=${value}`);
    });
  };

  return (
    <>
      <LayoutNavbar
        theme={theme as ThemeModeType}
        user={user}
        onClickSearchMode={handleClickSearchMode}
        onChangeTheme={handleChangeTheme}
        onAction={handleActionDropdown}
      />
      <LayoutSearchModal ref={refSearchModal} />
      <LayoutNotificationMenu notifications={notifications} />
    </>
  );
}
