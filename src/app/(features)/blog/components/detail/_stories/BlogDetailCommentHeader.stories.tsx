import { ComponentProps } from 'react';
import { ArgTypes, Meta, StoryFn, StoryObj } from '@storybook/react';
import { userFixtures } from '@fixtures/user.fixtures';
import { BlogDetailCommentHeader } from '../BlogDetailCommentHeader';

interface StoryProps extends ComponentProps<typeof BlogDetailCommentHeader> {}

type MyArgTypes = Partial<Record<keyof StoryProps, ArgTypes[string]>>;
const argTypes: MyArgTypes = {};

export default {
  title: 'features/blog/detail/BlogDetailCommentHeader',
  component: BlogDetailCommentHeader,
  argTypes,
} as Meta;

const Template: StoryFn<StoryProps> = ({ ...props }) => (
  <BlogDetailCommentHeader {...props} />
);

export const Default: StoryObj<StoryProps> = {
  render: Template,

  args: {
    userProfile: userFixtures.getUser().profileImage,
    username: userFixtures.getUser().username,
    isAuthor: false,
    createdAt: '2022-04-12',
    isAnonymous: false,
  },
};

export const Author: StoryObj<StoryProps> = {
  render: Template,

  args: {
    ...Default.args,
    isAuthor: true,
  },
};

export const DeletedHeader: StoryObj<StoryProps> = {
  render: Template,

  args: {
    ...Default.args,
    isDeleted: true,
  },
};

export const Anonymous: StoryObj<StoryProps> = {
  render: Template,

  args: {
    ...Default.args,
    isAnonymous: true,
  },
};

export const AnonymousAndDeleted: StoryObj<StoryProps> = {
  render: Template,

  args: {
    ...Default.args,
    isAnonymous: true,
    isDeleted: true,
  },
};
