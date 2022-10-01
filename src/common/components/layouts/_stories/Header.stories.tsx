import { ComponentProps } from 'react';
import { ComponentStory, ComponentMeta, ArgTypes } from '@storybook/react';
import { createInitialUser } from '@shared/manipulates/auth.create';
import { UserRoleEnum } from '@core/entities/auth.entity';
import { Header } from '../Header';

type MyArgTypes = Partial<
  Record<keyof ComponentProps<typeof Header>, ArgTypes[string]>
>;
const argTypes: MyArgTypes = {};

export default {
  title: 'common/layouts/Header',
  component: Header,
  argTypes,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = ({ ...props }) => (
  <Header {...props} />
);

export const NoLogged = Template.bind({});
NoLogged.args = {
  isLogged: false,
  themeMode: false,
  user: createInitialUser(),
};

export const Logged = Template.bind({});
Logged.args = {
  ...NoLogged.args,
  isLogged: true,
  user: {
    id: '1',
    profileImage:
      'https://assets-kormelon-v2.s3.ap-northeast-2.amazonaws.com/winter.jpg',
    role: UserRoleEnum.MEMBER,
    username: 'winter',
  },
};

export const Admin = Template.bind({});
Admin.args = {
  ...Logged.args,
  user: {
    id: '1',
    profileImage:
      'https://assets-kormelon-v2.s3.ap-northeast-2.amazonaws.com/winter.jpg',
    role: UserRoleEnum.ADMIN,
    username: 'winter',
  },
};

export const Dark = Template.bind({});
Dark.args = {
  ...Logged.args,
  themeMode: true,
};
