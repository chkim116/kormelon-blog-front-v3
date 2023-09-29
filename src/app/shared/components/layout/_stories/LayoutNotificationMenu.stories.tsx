import { ComponentProps } from 'react';
import { ArgTypes, Meta, StoryFn, StoryObj } from '@storybook/react';
import { NotificationSearchModel } from '@domain/uiStates';
import { LayoutNotificationMenu } from '../LayoutNotificationMenu';

interface StoryProps extends ComponentProps<typeof LayoutNotificationMenu> {}

type MyArgTypes = Partial<Record<keyof StoryProps, ArgTypes[string]>>;
const argTypes: MyArgTypes = {};

export default {
  title: 'shared/layout/LayoutNotificationMenu',
  component: LayoutNotificationMenu,
  argTypes,
} as Meta;

const Template: StoryFn<StoryProps> = ({ ...props }) => (
  <LayoutNotificationMenu {...props} />
);

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

export const Default: StoryObj<StoryProps> = {
  render: Template,

  args: {
    notifications: createNotifications(1),
  },
};

export const Empty: StoryObj<StoryProps> = {
  render: Template,

  args: {
    notifications: createNotifications(0),
  },
};

export const Many: StoryObj<StoryProps> = {
  render: Template,

  args: {
    notifications: createNotifications(100),
  },
};
