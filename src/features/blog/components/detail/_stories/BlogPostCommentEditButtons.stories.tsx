import { ComponentProps } from 'react';
import { ComponentStory, ComponentMeta, ArgTypes } from '@storybook/react';
import { BlogPostCommentEditButtons } from '../BlogPostCommentEditButtons';

type MyArgTypes = Partial<
  Record<
    keyof ComponentProps<typeof BlogPostCommentEditButtons>,
    ArgTypes[string]
  >
>;
const argTypes: MyArgTypes = {};

export default {
  title: 'blog/detail/BlogPostCommentEditButtons',
  component: BlogPostCommentEditButtons,
  argTypes,
} as ComponentMeta<typeof BlogPostCommentEditButtons>;

const Template: ComponentStory<typeof BlogPostCommentEditButtons> = ({
  ...props
}) => <BlogPostCommentEditButtons {...props} />;

export const Default = Template.bind({});
Default.args = {};

export const Anonymous = Template.bind({});
Anonymous.args = {
  isAnonymous: true,
};
