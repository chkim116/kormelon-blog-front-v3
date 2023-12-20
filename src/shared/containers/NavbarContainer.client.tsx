'use client';
import { useRef } from 'react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { toast } from '@shared/services/ToastService';
import { actSharedLogout } from '@shared/actions/sharedAuth.action';
import { NotificationSearchUiState } from '@shared/domains/notification/notification.uiState';
import { AuthUserUiState } from '@features/auth/domains/auth.uiState';
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
