import { ComponentProps } from 'react';
import { ComponentStory, ComponentMeta, ArgTypes } from '@storybook/react';
import { Box } from '@mui/material';
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

function createReplies(length: number, isUser: boolean) {
  return Array.from({ length }, (_, i) => ({
    id: String(i),
    isAnonymous: !isUser,
    createdAt: '2022-04-12',
    userId: isUser ? String(i) : null,
    username: isUser ? `유저 ${i}` : `익명 ${i}`,
    value:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odit cupiditate facere recusandae! Minima, dicta labore possimus soluta fugiat, aliquid maxime officiis dolorum autem suscipit expedita necessitatibus vitae? Minima, temporibus repellendus!',
    deletedAt: null,
  }));
}

const Template: ComponentStory<typeof BlogPostCommentReply> = ({
  ...props
}) => (
  <Box maxWidth="md" m="0 auto" pt={4} pb={24} px={4}>
    <BlogPostCommentReply {...props} />{' '}
  </Box>
);

export const ManyReplies = Template.bind({});
ManyReplies.args = {
  isOpen: true,
  replies: createReplies(50, true),
};

export const UserReplies = Template.bind({});
UserReplies.args = {
  ...ManyReplies.args,
  replies: createReplies(5, true),
};

export const AnonymousReplies = Template.bind({});
AnonymousReplies.args = {
  ...ManyReplies.args,
  replies: createReplies(50, false),
};

export const ReplyAuthor = Template.bind({});
ReplyAuthor.args = {
  ...ManyReplies.args,
  userId: '0',
  replies: createReplies(1, true),
};
