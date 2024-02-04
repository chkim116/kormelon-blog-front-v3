import { ComponentProps } from 'react';
import { ArgTypes, Meta, StoryFn, StoryObj } from '@storybook/react';
import { BlogCommonCardSkeleton } from '../BlogCommonCardSkeleton';

interface StoryProps extends ComponentProps<typeof BlogCommonCardSkeleton> {}

type MyArgTypes = Partial<Record<keyof StoryProps, ArgTypes[string]>>;
const argTypes: MyArgTypes = {};

export default {
  title: 'features/blog/common/BlogCommonCardSkeleton',
  component: BlogCommonCardSkeleton,
  argTypes,
} as Meta;

const Template: StoryFn<StoryProps> = ({ ...props }) => (
  <BlogCommonCardSkeleton {...props} />
);

export const Default: StoryObj<StoryProps> = {
  render: Template,

  args: {},
};
