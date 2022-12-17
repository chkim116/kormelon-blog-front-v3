import { ComponentProps } from 'react';
import { ComponentStory, ComponentMeta, ArgTypes } from '@storybook/react';
import { Box } from '@mui/material';
import { BlogPostCommentReplySearchModel } from '@features/blog/models';
import { BlogPostCommentReply } from '../BlogPostCommentReply';

type MyArgTypes = Partial<
  Record<keyof ComponentProps<typeof BlogPostCommentReply>, ArgTypes[string]>
>;
const argTypes: MyArgTypes = {};

export default {
  title: 'blog/detail/BlogPostCommentReply',
  component: BlogPostCommentReply,
  argTypes,
} as ComponentMeta<typeof BlogPostCommentReply>;

function createReplies(isUser = true): BlogPostCommentReplySearchModel {
  return {
    id: '1',
    isAnonymous: !isUser,
    createdAt: '2022-04-12',
    userId: isUser ? '1' : '',
    username: isUser ? '유저' : '익명',
    value:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odit cupiditate facere recusandae! Minima, dicta labore possimus soluta fugiat, aliquid maxime officiis dolorum autem suscipit expedita necessitatibus vitae? Minima, temporibus repellendus!',
    deletedAt: '',
    password: '',
  };
}

const Template: ComponentStory<typeof BlogPostCommentReply> = ({
  ...props
}) => (
  <Box maxWidth="md" m="0 auto" pt={4} pb={24} px={4}>
    <BlogPostCommentReply {...props} />{' '}
  </Box>
);

export const Default = Template.bind({});
Default.args = {
  reply: createReplies(),
};

export const EditMode = Template.bind({});
EditMode.args = {
  ...Default.args,
  userId: '1',
  replyEditMode: true,
};

export const Anonymous = Template.bind({});
Anonymous.args = {
  reply: createReplies(false),
};

export const AnonymousEditMode = Template.bind({});
AnonymousEditMode.args = {
  ...Anonymous.args,
  replyEditMode: true,
};
