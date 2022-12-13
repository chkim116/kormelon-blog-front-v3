import { ComponentProps } from 'react';
import { ComponentStory, ComponentMeta, ArgTypes } from '@storybook/react';
import { BlogPostCommentAnonymousField } from '../BlogPostCommentAnonymousField';

type MyArgTypes = Partial<
  Record<
    keyof ComponentProps<typeof BlogPostCommentAnonymousField>,
    ArgTypes[string]
  >
>;
const argTypes: MyArgTypes = {};

export default {
  title: 'blog/detail/BlogPostCommentAnonymousField',
  component: BlogPostCommentAnonymousField,
  argTypes,
} as ComponentMeta<typeof BlogPostCommentAnonymousField>;

const Template: ComponentStory<typeof BlogPostCommentAnonymousField> = ({
  ...props
}) => <BlogPostCommentAnonymousField {...props} />;

export const Default = Template.bind({});
Default.args = {};

export const DefaultValue = Template.bind({});
DefaultValue.args = {
  username: '익명',
  password: 'dlraud1',
};

export const LongValue = Template.bind({});
LongValue.args = {
  username: '익명익명익명익명익명익명익명익명익명익명익명익명익명익명익명익명',
  password: 'dlraud1dlraud1dlraud1dlraud1dlraud1dlraud1dlraud1d',
};
