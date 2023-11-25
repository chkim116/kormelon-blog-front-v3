import { ComponentProps, useRef } from 'react';
import { ArgTypes, Meta, StoryFn, StoryObj } from '@storybook/react';
import { useTheme } from 'next-themes';
import { AuthRoleEnum } from '@server/entities';
import { DEFAULT_IMAGE } from 'src/app/shared/constants';
import { NotificationSearchUiState } from '@domain/notification/notification.uiState';
import { createAuthUserUiState } from '@domain/auth/auth.create';
import { Navbar } from '../Navbar';
import { NavbarNotificationMenu } from '../NavbarNotificationMenu';
import {
  NavbarSearchModalHandle,
  NavbarSearchModal,
} from '../NavbarLayoutSearchModal';

interface StoryProps extends ComponentProps<typeof Navbar> {}

type MyArgTypes = Partial<Record<keyof StoryProps, ArgTypes[string]>>;
const argTypes: MyArgTypes = {};

export default {
  title: 'shared/Navbar',
  component: Navbar,
  argTypes,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

const createNotifications = (length: number) => {
  if (length === 0) {
    return [];
  }

  const notifications: NotificationSearchUiState[] = Array.from(
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

const Template: StoryFn<StoryProps> = ({ ...props }) => <Navbar {...props} />;

const CompleteTemplate: StoryFn<StoryProps> = ({ ...props }) => {
  const refSearchModal = useRef<NavbarSearchModalHandle>(null);

  const { theme, setTheme } = useTheme();

  const handleOpen = () => {
    refSearchModal.current?.open();
  };

  const handleChangeTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="max-w-6xl relative mx-auto h-full">
      <Navbar
        {...props}
        onClickSearchMode={handleOpen}
        onChangeTheme={handleChangeTheme}
      />
      <NavbarSearchModal ref={refSearchModal} />
      <NavbarNotificationMenu notifications={createNotifications(10)} />
    </div>
  );
};

export const Default: StoryObj<StoryProps> = {
  render: Template,

  args: {
    user: createAuthUserUiState(),
  },
};

export const User: StoryObj<StoryProps> = {
  render: Template,

  args: {
    user: {
      id: 'sfsd',
      role: AuthRoleEnum.ADMIN,
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
