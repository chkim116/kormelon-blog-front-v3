import { ComponentProps } from 'react';
import { StoryFn, Meta, ArgTypes } from '@storybook/react';
import { BlogWriteMeta } from '../BlogWriteMeta';

type MyArgTypes = Partial<
  Record<keyof ComponentProps<typeof BlogWriteMeta>, ArgTypes[string]>
>;
const argTypes: MyArgTypes = {};

export default {
  title: 'features/blog/write/BlogWriteMeta',
  component: BlogWriteMeta,
  argTypes,
} as Meta<typeof BlogWriteMeta>;

const Template: StoryFn<typeof BlogWriteMeta> = ({ ...props }) => (
  <BlogWriteMeta {...props} />
);

export const Default = {
  render: Template,
  args: {},
};
