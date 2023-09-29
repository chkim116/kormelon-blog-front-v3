import { ComponentProps } from 'react';
import { ArgTypes, Meta, StoryFn, StoryObj } from '@storybook/react';
import { BlogDetailContentAction } from '../BlogDetailContentAction';

interface StoryProps extends ComponentProps<typeof BlogDetailContentAction> {}

type MyArgTypes = Partial<Record<keyof StoryProps, ArgTypes[string]>>;
const argTypes: MyArgTypes = {};

export default {
  title: 'features/blog/detail/BlogDetailContentAction',
  component: BlogDetailContentAction,
  argTypes,
} as Meta;

const Template: StoryFn<StoryProps> = ({ ...props }) => (
  <BlogDetailContentAction {...props} />
);

export const Default: StoryObj<StoryProps> = {
  render: Template,

  args: {
    isLiked: false,
  },
};

export const Liked: StoryObj<StoryProps> = {
  render: Template,

  args: {
    isLiked: true,
  },
};
