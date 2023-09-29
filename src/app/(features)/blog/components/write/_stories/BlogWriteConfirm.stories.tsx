import { ComponentProps } from 'react';
import { StoryFn, Meta, ArgTypes } from '@storybook/react';
import { BlogWriteConfirm } from '../BlogWriteConfirm';

type MyArgTypes = Partial<
  Record<keyof ComponentProps<typeof BlogWriteConfirm>, ArgTypes[string]>
>;
const argTypes: MyArgTypes = {};

export default {
  title: 'features/blog/write/BlogWriteConfirm',
  component: BlogWriteConfirm,
  argTypes,
} as Meta<typeof BlogWriteConfirm>;

const Template: StoryFn<typeof BlogWriteConfirm> = ({ ...props }) => (
  <BlogWriteConfirm {...props} />
);

export const Default = {
  render: Template,
  args: {},
};

export const Private = {
  render: Template,

  args: {
    isPrivate: true,
  },
};
