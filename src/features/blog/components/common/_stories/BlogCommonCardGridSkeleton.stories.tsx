import { ComponentProps } from 'react';
import { ArgTypes, Meta, StoryFn, StoryObj } from '@storybook/react';
import { BlogCommonCardGridSkeleton } from '../BlogCommonCardGridSkeleton';

interface StoryProps
  extends ComponentProps<typeof BlogCommonCardGridSkeleton> {}

type MyArgTypes = Partial<Record<keyof StoryProps, ArgTypes[string]>>;
const argTypes: MyArgTypes = {};

export default {
  title: 'features/blog/common/BlogCommonCardGridSkeleton',
  component: BlogCommonCardGridSkeleton,
  argTypes,
} as Meta;

const Template: StoryFn<StoryProps> = ({ ...props }) => (
  <div className="max-w-6xl">
    <BlogCommonCardGridSkeleton {...props} />
  </div>
);

export const Default: StoryObj<StoryProps> = {
  render: Template,

  args: {
    length: 6,
  },
};

export const Single: StoryObj<StoryProps> = {
  render: Template,

  args: {
    length: 1,
  },
};

export const Many: StoryObj<StoryProps> = {
  render: Template,

  args: {
    length: 12,
  },
};
