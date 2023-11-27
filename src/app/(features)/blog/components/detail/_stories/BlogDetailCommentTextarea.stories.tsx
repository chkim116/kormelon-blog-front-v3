import { ComponentProps } from 'react';
import { ArgTypes, Meta, StoryFn, StoryObj } from '@storybook/react';
import { BlogDetailCommentTextarea } from '../BlogDetailCommentTextarea';

interface StoryProps extends ComponentProps<typeof BlogDetailCommentTextarea> {}

type MyArgTypes = Partial<Record<keyof StoryProps, ArgTypes[string]>>;
const argTypes: MyArgTypes = {};

export default {
  title: 'features/blog/detail/BlogDetailCommentTextarea',
  component: BlogDetailCommentTextarea,
  argTypes,
} as Meta;

const Template: StoryFn<StoryProps> = ({ ...props }) => (
  <BlogDetailCommentTextarea {...props} />
);

export const Default: StoryObj<StoryProps> = {
  render: Template,

  args: {
    isAnonymous: false,
  },
};

export const Anonymous: StoryObj<StoryProps> = {
  render: Template,

  args: {
    isAnonymous: true,
  },
};
