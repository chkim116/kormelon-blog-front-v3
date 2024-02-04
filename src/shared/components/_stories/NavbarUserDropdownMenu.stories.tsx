import { ComponentProps } from 'react';
import { ArgTypes, Meta, StoryFn, StoryObj } from '@storybook/react';
import { DEFAULT_IMAGE } from '@shared/constants/img.const';
import { NavbarUserDropdownMenu } from '../NavbarUserDropdownMenu';

interface StoryProps extends ComponentProps<typeof NavbarUserDropdownMenu> {}

type MyArgTypes = Partial<Record<keyof StoryProps, ArgTypes[string]>>;
const argTypes: MyArgTypes = {};

export default {
  title: 'shared/NavbarUserDropdownMenu',
  component: NavbarUserDropdownMenu,
  argTypes,
} as Meta;

const Template: StoryFn<StoryProps> = ({ ...props }) => (
  <NavbarUserDropdownMenu {...props} />
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
