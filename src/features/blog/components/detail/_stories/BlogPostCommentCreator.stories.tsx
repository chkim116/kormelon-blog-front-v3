import { ComponentProps } from 'react';
import { ComponentStory, ComponentMeta, ArgTypes } from '@storybook/react';
import { BlogPostCommentCreator } from '../BlogPostCommentCreator';

type MyArgTypes = Partial<
  Record<keyof ComponentProps<typeof BlogPostCommentCreator>, ArgTypes[string]>
>;
const argTypes: MyArgTypes = {};

export default {
  title: 'blog/detail/BlogPostCommentCreator',
  component: BlogPostCommentCreator,
  argTypes,
} as ComponentMeta<typeof BlogPostCommentCreator>;

const Template: ComponentStory<typeof BlogPostCommentCreator> = ({
  ...props
}) => <BlogPostCommentCreator {...props} />;

export const Default = Template.bind({});
Default.args = {};

export const Anonymous = Template.bind({});
Anonymous.args = {
  isAnonymous: true,
};
