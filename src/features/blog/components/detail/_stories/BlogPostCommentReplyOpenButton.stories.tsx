import { ComponentProps } from 'react';
import { ComponentStory, ComponentMeta, ArgTypes } from '@storybook/react';
import { BlogPostCommentReplyOpenButton } from '../BlogPostCommentReplyOpenButton';

type MyArgTypes = Partial<
  Record<
    keyof ComponentProps<typeof BlogPostCommentReplyOpenButton>,
    ArgTypes[string]
  >
>;
const argTypes: MyArgTypes = {};

export default {
  title: 'blog/detail/BlogPostCommentReplyOpenButton',
  component: BlogPostCommentReplyOpenButton,
  argTypes,
} as ComponentMeta<typeof BlogPostCommentReplyOpenButton>;

const Template: ComponentStory<typeof BlogPostCommentReplyOpenButton> = ({
  ...props
}) => <BlogPostCommentReplyOpenButton {...props} />;

export const Default = Template.bind({});
Default.args = {
  replyLength: 0,
};

export const FiveReply = Template.bind({});
FiveReply.args = {
  replyLength: 5,
};

export const ManyReply = Template.bind({});
ManyReply.args = {
  replyLength: 500,
};
