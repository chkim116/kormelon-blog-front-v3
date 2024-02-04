import { ComponentProps } from 'react';
import { ArgTypes, Meta, StoryFn, StoryObj } from '@storybook/react';
import { BlogCommonPagination } from '../BlogCommonPagination';

interface StoryProps extends ComponentProps<typeof BlogCommonPagination> {}

type MyArgTypes = Partial<Record<keyof StoryProps, ArgTypes[string]>>;
const argTypes: MyArgTypes = {};

export default {
  title: 'features/blog/common/BlogCommonPagination',
  component: BlogCommonPagination,
  argTypes,
} as Meta;

const Template: StoryFn<StoryProps> = ({ ...props }) => (
  <BlogCommonPagination {...props} />
);

export const Default: StoryObj<StoryProps> = {
  render: Template,

  args: {
    total: 10,
    page: 1,
  },
};

export const CurrentPage: StoryObj<StoryProps> = {
  render: Template,

  args: {
    ...Default.args,
    page: 3,
  },
};

export const LargeTotal: StoryObj<StoryProps> = {
  render: Template,

  args: {
    total: 100,
    page: 5,
  },
};

export const EmptyTotal: StoryObj<StoryProps> = {
  render: Template,

  args: {
    total: 0,
    page: 5,
  },
};
