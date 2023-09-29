'use client';
import { useState } from 'react';
import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@nextui-org/react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { DarkMode, LightMode, Search } from '@mui/icons-material';
import { UserEntity, UserRoleEnum } from '@server/entities';
import { NAV_BAR_MENU_ITEM_LIST } from '@shared/constants';
import { LayoutUserDropdownMenu } from './LayoutUserDropdownMenu';
import { LayoutMenuLink } from './LayoutMenuLink';
import { LayoutIconList } from './LayoutIconList';

export type ThemeModeType = 'dark' | 'light';

interface LayoutNavBarProps {
  user: UserEntity;
  theme: ThemeModeType;
  onClickSearchMode: () => void;
  onChangeTheme: () => void;
  onAction: (key: string) => void;
}

export function LayoutNavbar({
  user,
  theme,
  onClickSearchMode,
  onChangeTheme,
  onAction,
}: LayoutNavBarProps) {
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isLogged = Boolean(user.id);
  const isAdmin = user.role === UserRoleEnum.ADMIN;

  const themeIcon =
    theme === 'light' ? (
      <DarkMode width={18} height={18} />
    ) : (
      <LightMode width={18} height={18} />
    );

  const handleMenuOpenChange = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={handleMenuOpenChange}
      shouldHideOnScroll
    >
      <NavbarContent as="div">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
          className="sm:hidden"
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
            <LayoutMenuLink
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
            </LayoutMenuLink>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent as="div" className="items-center gap-2" justify="end">
        <Button variant="light" isIconOnly onPress={onClickSearchMode}>
          <Search width={18} height={18} />
        </Button>

        {isLogged && (
          <LayoutUserDropdownMenu
            isLogged={isLogged}
            isAdmin={isAdmin}
            username={user.username}
            profileImage={user.profileImage}
            onAction={onAction}
          />
        )}
      </NavbarContent>

      {/* 모바일용 네비게이션 */}
      <NavbarMenu className="py-6">
        {NAV_BAR_MENU_ITEM_LIST.map(({ label, href, isExternal }) => (
          <NavbarMenuItem key={label}>
            <LayoutMenuLink
              label={label}
              href={href}
              isExternal={isExternal}
              isActive={pathname === href}
            />
          </NavbarMenuItem>
        ))}

        <div className="mt-6">
          <LayoutIconList />
        </div>
      </NavbarMenu>
    </Navbar>
  );
}
