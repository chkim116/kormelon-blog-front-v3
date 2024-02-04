import { ComponentProps } from 'react';
import { ArgTypes, Meta, StoryFn, StoryObj } from '@storybook/react';
import { BlogSearchLandingContentSkeleton } from '../BlogSearchLandingContentSkeleton';

interface StoryProps
  extends ComponentProps<typeof BlogSearchLandingContentSkeleton> {}

type MyArgTypes = Partial<Record<keyof StoryProps, ArgTypes[string]>>;
const argTypes: MyArgTypes = {};

export default {
  title: 'features/blog/search/BlogSearchLandingContentSkeleton',
  component: BlogSearchLandingContentSkeleton,
  argTypes,
} as Meta;

const Template: StoryFn<StoryProps> = ({ ...props }) => (
  <BlogSearchLandingContentSkeleton {...props} />
);

export const Default: StoryObj<StoryProps> = {
  render: Template,

  args: {},
};
