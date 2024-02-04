'use client';
import { ReactNode, useRef } from 'react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { authService } from '@shared/domains/auth';
import { useUserSession } from '@shared/hooks/useUserSession';
import { toast } from '@shared/services/ToastService';
import { Navbar, ThemeModeType } from '../components/Navbar';
import {
  NavbarSearchModal,
  NavbarSearchModalHandle,
} from '../components/NavbarLayoutSearchModal';

interface NavbarContainerProps {
  notificationsComp: ReactNode;
}

export default function NavbarContainer({
  notificationsComp,
}: NavbarContainerProps) {
  const user = useUserSession();

  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const refSearchModal = useRef<NavbarSearchModalHandle>(null);

  const handleChangeTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleActionDropdown = async (key: string) => {
    if (key === 'logout') {
      await authService.logout();
      router.refresh();
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
      {notificationsComp}
    </>
  );
}
