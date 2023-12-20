import { ComponentProps } from 'react';
import { ArgTypes, Meta, StoryFn, StoryObj } from '@storybook/react';
import { RouteProgress } from '../RouteProgress';

interface StoryProps extends ComponentProps<typeof RouteProgress> {}

type MyArgTypes = Partial<Record<keyof StoryProps, ArgTypes[string]>>;
const argTypes: MyArgTypes = {};

export default {
  title: 'shared/common/RouteProgress',
  component: RouteProgress,
  argTypes,
} as Meta;

const Template: StoryFn<StoryProps> = ({ ...props }) => (
  <RouteProgress {...props} />
);

export const Default: StoryObj<StoryProps> = {
  render: Template,

  args: {},
};
