'use client';
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
import { Notifications } from '@mui/icons-material';
import { NotificationSearchModel } from '@domain/uiStates';

interface LayoutNotificationMenuProps {
  notifications: NotificationSearchModel[];
}

export function LayoutNotificationMenu({
  notifications,
}: LayoutNotificationMenuProps) {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Dropdown>
        <Badge
          content={notifications.length > 99 ? '99+' : notifications.length}
          color="danger"
        >
          <DropdownTrigger as="div">
            <Button isIconOnly variant="solid" aria-label="알림">
              <Notifications />
            </Button>
          </DropdownTrigger>
        </Badge>

        <DropdownMenu className="max-w-40 w-full max-h-60 overflow-y-auto scrollbar-hide">
          {notifications.length ? (
            notifications.map(({ id, postId, message }) => (
              <DropdownItem key={id} description="게시글로 바로가기">
                <Link as={NextLink} href={`/blog/${postId}?notification=${id}`}>
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
