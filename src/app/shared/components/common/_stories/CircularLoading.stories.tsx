import { ComponentProps } from 'react';
import { ArgTypes, Meta, StoryFn, StoryObj } from '@storybook/react';
import { CircularLoading } from '../CircularLoading';

interface StoryProps extends ComponentProps<typeof CircularLoading> {}

type MyArgTypes = Partial<Record<keyof StoryProps, ArgTypes[string]>>;
const argTypes: MyArgTypes = {};

export default {
  title: 'shared/common/CircularLoading',
  component: CircularLoading,
  argTypes,
} as Meta;

const Template: StoryFn<StoryProps> = ({ ...props }) => (
  <CircularLoading {...props} />
);

export const Default: StoryObj<StoryProps> = {
  render: Template,

  args: {},
};
