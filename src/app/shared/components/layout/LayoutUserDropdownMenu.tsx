'use client';
import { Key } from 'react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  DropdownSection,
} from '@nextui-org/react';
import {
  NAV_BAR_ADMIN_USER_MENU_ITEM_LIST,
  NAV_BAR_MEMBER_USER_MENU_ITEM_LIST,
} from '@shared/constants';

interface LayoutUserDropdownMenuProps {
  username: string;
  profileImage: string;
  isLogged: boolean;
  isAdmin: boolean;
  onAction: (key: string) => void;
}

export function LayoutUserDropdownMenu({
  isLogged,
  isAdmin,
  profileImage,
  username,
  onAction,
}: LayoutUserDropdownMenuProps) {
  const menuItems = isAdmin
    ? NAV_BAR_ADMIN_USER_MENU_ITEM_LIST
    : NAV_BAR_MEMBER_USER_MENU_ITEM_LIST;

  const handleActionDropdown = (key: Key) => {
    if (!key || key === 'profile') {
      return;
    }

    onAction(String(key));
  };

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          name={username}
          size="sm"
          src={profileImage}
        />
      </DropdownTrigger>
      <DropdownMenu
        aria-label="프로필 액션"
        variant="flat"
        onAction={handleActionDropdown}
      >
        <DropdownSection>
          {isLogged ? (
            menuItems.map((item) => (
              <DropdownItem
                key={item.key}
                {...(item.key === 'logout' && {
                  color: 'danger',
                  className: 'text-danger ',
                })}
              >
                {item.key === 'profile' ? username : item.label}
              </DropdownItem>
            ))
          ) : (
            <DropdownItem key="/auth">로그인</DropdownItem>
          )}
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
