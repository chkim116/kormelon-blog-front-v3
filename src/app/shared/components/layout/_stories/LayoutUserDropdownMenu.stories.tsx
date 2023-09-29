import { ComponentProps } from 'react';
import { ArgTypes, Meta, StoryFn, StoryObj } from '@storybook/react';
import { DEFAULT_IMAGE } from '@shared/constants';
import { LayoutUserDropdownMenu } from '../LayoutUserDropdownMenu';

interface StoryProps extends ComponentProps<typeof LayoutUserDropdownMenu> {}

type MyArgTypes = Partial<Record<keyof StoryProps, ArgTypes[string]>>;
const argTypes: MyArgTypes = {};

export default {
  title: 'shared/layout/LayoutUserDropdownMenu',
  component: LayoutUserDropdownMenu,
  argTypes,
} as Meta;

const Template: StoryFn<StoryProps> = ({ ...props }) => (
  <LayoutUserDropdownMenu {...props} />
);

export const Default: StoryObj<StoryProps> = {
  render: Template,

  args: {
    isLogged: false,
    profileImage: '',
    username: '',
  },
};

export const Logged: StoryObj<StoryProps> = {
  render: Template,

  args: {
    profileImage: DEFAULT_IMAGE,
    username: 'kimchanghoe',
    isLogged: true,
  },
};
