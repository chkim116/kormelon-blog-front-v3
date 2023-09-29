import { ComponentProps } from 'react';
import { ArgTypes, Meta, StoryFn, StoryObj } from '@storybook/react';
import { LayoutMenuLink } from '../LayoutMenuLink';

interface StoryProps extends ComponentProps<typeof LayoutMenuLink> {}

type MyArgTypes = Partial<Record<keyof StoryProps, ArgTypes[string]>>;
const argTypes: MyArgTypes = {};

export default {
  title: 'shared/layout/LayoutMenuLink',
  component: LayoutMenuLink,
  argTypes,
} as Meta;

const Template: StoryFn<StoryProps> = ({ ...props }) => (
  <LayoutMenuLink {...props} />
);

export const Default: StoryObj<StoryProps> = {
  render: Template,

  args: {
    href: '#',
    label: 'default link',
    isActive: false,
    isExternal: false,
  },
};

export const Active: StoryObj<StoryProps> = {
  render: Template,

  args: {
    ...Default.args,
    isActive: true,
  },
};

export const External: StoryObj<StoryProps> = {
  render: Template,

  args: {
    ...Default.args,
    isActive: false,
    isExternal: true,
  },
};
