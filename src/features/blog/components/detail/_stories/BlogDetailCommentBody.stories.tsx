import { ComponentProps } from 'react';
import { ArgTypes, Meta, StoryFn, StoryObj } from '@storybook/react';
import { commentFixtures } from '@fixtures/comment.fixtures';
import { BlogDetailCommentBody } from '../BlogDetailCommentBody';

interface StoryProps extends ComponentProps<typeof BlogDetailCommentBody> {}

type MyArgTypes = Partial<Record<keyof StoryProps, ArgTypes[string]>>;
const argTypes: MyArgTypes = {};

export default {
  title: 'features/blog/detail/BlogDetailCommentBody',
  component: BlogDetailCommentBody,
  argTypes,
} as Meta;

const Template: StoryFn<StoryProps> = ({ ...props }) => (
  <BlogDetailCommentBody {...props} />
);

export const Default: StoryObj<StoryProps> = {
  render: Template,

  args: {
    ...commentFixtures.getCommentList(1, false)[0],
  },
};

export const Author: StoryObj<StoryProps> = {
  render: Template,

  args: {
    ...commentFixtures.getCommentList(1, false)[0],
    isAuthor: true,
  },
};

export const Anonymous: StoryObj<StoryProps> = {
  render: Template,

  args: {
    ...commentFixtures.getCommentList(1, false)[0],
    isAnonymous: true,
  },
};

export const Deleted: StoryObj<StoryProps> = {
  render: Template,

  args: {
    ...commentFixtures.getCommentList(1, false)[0],
    isDeleted: true,
  },
};

export const WithReplies: StoryObj<StoryProps> = {
  render: Template,

  args: {
    ...commentFixtures.getCommentListWithReplies(1, 1)[0],
  },
};

export const NoReplyButton: StoryObj<StoryProps> = {
  render: Template,

  args: {
    ...commentFixtures.getCommentListWithReplies(1, 1)[0],
    shownReply: false,
  },
};

const ManyTemplate: StoryFn<StoryProps> = ({ ...templateProps }) => (
  <>
    {commentFixtures.getCommentList(20, false).map((props) => (
      <BlogDetailCommentBody key={props.id} {...props} {...templateProps} />
    ))}
  </>
);

export const Many: StoryObj<StoryProps> = {
  render: ManyTemplate,

  args: {},
};
