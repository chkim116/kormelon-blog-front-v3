import { ComponentProps } from 'react';
import { ComponentStory, ComponentMeta, ArgTypes } from '@storybook/react';
import { Box } from '@mui/material';
import { BlogPostCommentHeader } from '../BlogPostCommentHeader';

type MyArgTypes = Partial<
  Record<keyof ComponentProps<typeof BlogPostCommentHeader>, ArgTypes[string]>
>;
const argTypes: MyArgTypes = {};

export default {
  title: 'blog/detail/BlogPostCommentHeader',
  component: BlogPostCommentHeader,
  argTypes,
} as ComponentMeta<typeof BlogPostCommentHeader>;

const Template: ComponentStory<typeof BlogPostCommentHeader> = ({
  ...props
}) => (
  <Box maxWidth="md">
    <BlogPostCommentHeader {...props} />
  </Box>
);

export const Default = Template.bind({});
Default.args = {
  username: 'smile',
  isAuthor: false,
  createdAt: '2022-04-12',
};

export const Author = Template.bind({});
Author.args = {
  ...Default.args,
  isAuthor: true,
};

export const DeletedHeader = Template.bind({});
DeletedHeader.args = {
  ...Default.args,
  isDeleted: true,
};

export const Anonymous = Template.bind({});
Anonymous.args = {
  ...Default.args,
  isAnonymous: true,
};

export const AnonymousAndDeleted = Template.bind({});
AnonymousAndDeleted.args = {
  ...Default.args,
  isAnonymous: true,
  isDeleted: true,
};
