'use client';
import { useEffect, useState } from 'react';
import {
  Button,
  Link,
  Navbar as NextUiNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@nextui-org/react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { LucideIcon } from '@common/components/LucideIcon';
import { AuthRoleEnum } from '@core/entities';
import { NAV_BAR_MENU_ITEM_LIST } from '@shared/constants/navbar.const';
import { AuthUserUiState } from '@shared/domains/auth/auth.uiState';
import { NavbarUserDropdownMenu } from './NavbarUserDropdownMenu';
import { NavbarMenuLink } from './NavbarMenuLink';
import { NavbarIconList } from './NavbarIconList';

export type ThemeModeType = 'dark' | 'light';

interface NavbarProps {
  user: AuthUserUiState;
  theme: ThemeModeType;
  onClickSearchMode: () => void;
  onChangeTheme: () => void;
  onAction: (key: string) => void;
}

// TODO: 헤더의 렌더링 여부 ..
export function Navbar({
  user,
  theme,
  onClickSearchMode,
  onChangeTheme,
  onAction,
}: NavbarProps) {
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isLogged = Boolean(user.id);
  const isAdmin = user.role === AuthRoleEnum.ADMIN;

  const themeIcon = (
    <LucideIcon name={theme === 'light' ? 'moon' : 'sun'} size={18} />
  );

  const handleMenuOpenChange = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <NextUiNavbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={handleMenuOpenChange}
      shouldHideOnScroll
    >
      <NavbarContent as="div">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
          className="flex sm:hidden"
          isSelected={isMenuOpen}
        />

        <NavbarBrand>
          <Button
            className="mr-1"
            size="sm"
            variant="light"
            isIconOnly
            onPress={onChangeTheme}
          >
            {themeIcon}
          </Button>
          <Link as={NextLink} href="/" className="font-bold text-inherit">
            Kormelon
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="start">
        {NAV_BAR_MENU_ITEM_LIST.map(({ href, label, isExternal }) => (
          <NavbarItem key={label} isActive={pathname === href}>
            <NavbarMenuLink
              isBlock
              size="md"
              color="foreground"
              label={label}
              href={href}
              as={NextLink}
              isExternal={isExternal}
              isActive={pathname === href}
            >
              {label}
            </NavbarMenuLink>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent as="div" className="items-center gap-2" justify="end">
        <Button variant="light" isIconOnly onClick={onClickSearchMode}>
          <LucideIcon name="search" size={18} />
        </Button>

        {isLogged && (
          <NavbarUserDropdownMenu
            isLogged={isLogged}
            isAdmin={isAdmin}
            username={user.username}
            profileImage={user.profileImage}
            onAction={onAction}
          />
        )}
      </NavbarContent>

      {/* 모바일용 네비게이션 */}
      <NavbarMenu className="sm:block hidden py-6">
        {NAV_BAR_MENU_ITEM_LIST.map(({ label, href, isExternal }) => (
          <NavbarMenuItem key={label}>
            <NavbarMenuLink
              label={label}
              href={href}
              isExternal={isExternal}
              isActive={pathname === href}
            />
          </NavbarMenuItem>
        ))}

        <div className="mt-6">
          <NavbarIconList />
        </div>
      </NavbarMenu>
    </NextUiNavbar>
  );
}
