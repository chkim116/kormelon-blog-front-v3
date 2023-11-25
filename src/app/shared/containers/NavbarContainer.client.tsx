'use client';
import { useRef } from 'react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { AuthUserUiState } from '@domain/auth/auth.uiState';
import { NotificationSearchUiState } from '@domain/notification/notification.uiState';
import { actSharedLogout } from 'src/app/shared/actions/sharedAuth.action';
import { toast } from 'src/app/shared/services/ToastService';
import { Navbar, ThemeModeType } from '../components/Navbar';
import { NavbarNotificationMenu } from '../components/NavbarNotificationMenu';
import {
  NavbarSearchModalHandle,
  NavbarSearchModal,
} from '../components/NavbarLayoutSearchModal';

interface NavbarContainerClientProps {
  user: AuthUserUiState;
  notifications: NotificationSearchUiState[];
}

export function NavbarContainerClient({
  user,
  notifications,
}: NavbarContainerClientProps) {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const refSearchModal = useRef<NavbarSearchModalHandle>(null);

  const handleChangeTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleActionDropdown = async (key: string) => {
    if (key === 'logout') {
      await actSharedLogout();
      toast.open('success', '로그아웃');
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
      <Navbar
        theme={theme as ThemeModeType}
        user={user}
        onClickSearchMode={handleClickSearchMode}
        onChangeTheme={handleChangeTheme}
        onAction={handleActionDropdown}
      />
      <NavbarSearchModal ref={refSearchModal} />
      <NavbarNotificationMenu notifications={notifications} />
    </>
  );
}
