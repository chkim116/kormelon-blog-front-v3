'use client';
import { useState, useEffect } from 'react';
import NextLink from 'next/link';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  Button,
  Link,
  DropdownItem,
  Badge,
} from '@nextui-org/react';
import { LucideIcon } from '@shared/components/common/Icon';
import { NotificationSearchUiState } from '@domain/notification/notification.uiState';

interface NavbarNotificationMenuProps {
  notifications: NotificationSearchUiState[];
}

export function NavbarNotificationMenu({
  notifications: outNotifications,
}: NavbarNotificationMenuProps) {
  const [notifications, setNotifications] = useState(outNotifications);

  const handleClickCurried = (id: number) => () => {
    setNotifications((prev) => prev.filter((item) => item.id !== id));
  };

  useEffect(() => {
    setNotifications(outNotifications);
  }, [outNotifications]);

  if (!notifications?.length) {
    return;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Dropdown>
        <Badge
          content={notifications.length > 99 ? '99+' : notifications.length}
          color="danger"
        >
          <DropdownTrigger as="div">
            <Button isIconOnly variant="solid" aria-label="알림">
              <LucideIcon name='bell' />
            </Button>
          </DropdownTrigger>
        </Badge>

        <DropdownMenu className="max-w-40 w-full max-h-60 overflow-y-auto scrollbar-hide">
          {notifications.length ? (
            notifications.map(({ id, postId, message }) => (
              <DropdownItem key={id} description="게시글로 바로가기">
                <Link
                  as={NextLink}
                  href={`/blog/${postId}?notificationId=${id}`}
                  onClick={handleClickCurried(id)}
                >
                  {message}
                </Link>
              </DropdownItem>
            ))
          ) : (
            <DropdownItem>:( 알림이 없습니다.</DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
