import { ComponentProps } from 'react';
import { ArgTypes, Meta, StoryFn, StoryObj } from '@storybook/react';
import { IndexUserMenu } from '../IndexUserMenu';

interface StoryProps extends ComponentProps<typeof IndexUserMenu> {}

type MyArgTypes = Partial<Record<keyof StoryProps, ArgTypes[string]>>;
const argTypes: MyArgTypes = {};

export default {
  title: 'features/index/IndexUserMenu',
  component: IndexUserMenu,
  argTypes,
} as Meta;

const Template: StoryFn<StoryProps> = ({ ...props }) => (
  <IndexUserMenu {...props} />
);

export const Default: StoryObj<StoryProps> = {
  render: Template,

  args: {}
};