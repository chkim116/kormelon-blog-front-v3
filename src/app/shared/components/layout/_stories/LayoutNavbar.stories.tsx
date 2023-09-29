import { ComponentProps, useRef } from 'react';
import { ArgTypes, Meta, StoryFn, StoryObj } from '@storybook/react';
import { useTheme } from 'next-themes';
import { createInitialUser } from '@domain/manipulates';
import { UserRoleEnum } from '@server/entities';
import { DEFAULT_IMAGE } from '@shared/constants';
import { NotificationSearchModel } from '@domain/uiStates';
import { LayoutNavbar } from '../LayoutNavbar';
import { LayoutNotificationMenu } from '../LayoutNotificationMenu';
import {
  LayoutSearchModalHandle,
  LayoutSearchModal,
} from '../LayoutSearchModal';

interface StoryProps extends ComponentProps<typeof LayoutNavbar> {}

type MyArgTypes = Partial<Record<keyof StoryProps, ArgTypes[string]>>;
const argTypes: MyArgTypes = {};

export default {
  title: 'shared/layout/LayoutNavbar',
  component: LayoutNavbar,
  argTypes,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

const createNotifications = (length: number) => {
  if (length === 0) {
    return [];
  }

  const notifications: NotificationSearchModel[] = Array.from(
    { length },
    (_, i) => ({
      id: i,
      commentId: i,
      postId: i,
      createdAt: '2023-08-24',
      isRead: false,
      message: '알림메시지입니다 알림메시지입니다.',
    }),
  );

  return notifications;
};

const Template: StoryFn<StoryProps> = ({ ...props }) => (
  <LayoutNavbar {...props} />
);

const CompleteTemplate: StoryFn<StoryProps> = ({ ...props }) => {
  const refSearchModal = useRef<LayoutSearchModalHandle>(null);

  const { theme, setTheme } = useTheme();

  const handleOpen = () => {
    refSearchModal.current?.open();
  };

  const handleChangeTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="max-w-6xl relative mx-auto h-full">
      <LayoutNavbar
        {...props}
        onClickSearchMode={handleOpen}
        onChangeTheme={handleChangeTheme}
      />
      <LayoutSearchModal ref={refSearchModal} />
      <LayoutNotificationMenu notifications={createNotifications(10)} />
    </div>
  );
};

export const Default: StoryObj<StoryProps> = {
  render: Template,

  args: {
    user: createInitialUser(),
  },
};

export const User: StoryObj<StoryProps> = {
  render: Template,

  args: {
    user: {
      id: 'sfsd',
      role: UserRoleEnum.ADMIN,
      profileImage: DEFAULT_IMAGE,
      username: 'kimchanghoe',
    },
  },
};

export const Complete: StoryObj<StoryProps> = {
  render: CompleteTemplate,

  args: {
    ...User.args,
  },
};
