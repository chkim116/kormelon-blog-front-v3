import { ComponentProps } from 'react';
import { ArgTypes, Meta, StoryFn, StoryObj } from '@storybook/react';
import { BlogDetailContentSkeleton } from '../BlogDetailContentSkeleton';

interface StoryProps extends ComponentProps<typeof BlogDetailContentSkeleton> {}

type MyArgTypes = Partial<Record<keyof StoryProps, ArgTypes[string]>>;
const argTypes: MyArgTypes = {};

export default {
  title: 'features/blog/detail/BlogDetailContentSkeleton',
  component: BlogDetailContentSkeleton,
  argTypes,
} as Meta;

const Template: StoryFn<StoryProps> = ({ ...props }) => (
  <BlogDetailContentSkeleton {...props} />
);

export const Default: StoryObj<StoryProps> = {
  render: Template,

  args: {},
};
