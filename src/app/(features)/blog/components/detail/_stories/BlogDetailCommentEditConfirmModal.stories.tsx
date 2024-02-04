import { ComponentProps } from 'react';
import { ArgTypes, Meta, StoryFn, StoryObj } from '@storybook/react';
import { BlogDetailCommentEditConfirmModal } from '../BlogDetailCommentEditConfirmModal';

interface StoryProps
  extends ComponentProps<typeof BlogDetailCommentEditConfirmModal> {}

type MyArgTypes = Partial<Record<keyof StoryProps, ArgTypes[string]>>;
const argTypes: MyArgTypes = {};

export default {
  title: 'features/blog/detail/BlogDetailCommentEditConfirmModal',
  component: BlogDetailCommentEditConfirmModal,
  argTypes,
} as Meta;

const Template: StoryFn<StoryProps> = ({ ...props }) => (
  <BlogDetailCommentEditConfirmModal {...props} />
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
