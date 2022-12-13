import { ComponentProps } from 'react';
import { ComponentStory, ComponentMeta, ArgTypes } from '@storybook/react';
import { BlogPostCommentTextField } from '../BlogPostCommentTextField';

type MyArgTypes = Partial<
  Record<
    keyof ComponentProps<typeof BlogPostCommentTextField>,
    ArgTypes[string]
  >
>;
const argTypes: MyArgTypes = {};

export default {
  title: 'blog/detail/BlogPostCommentTextField',
  component: BlogPostCommentTextField,
  argTypes,
} as ComponentMeta<typeof BlogPostCommentTextField>;

const Template: ComponentStory<typeof BlogPostCommentTextField> = ({
  ...props
}) => <BlogPostCommentTextField {...props} />;

export const Readonly = Template.bind({});
Readonly.args = {
  readonly: true,
  value: '이것은 코멘트입니다.',
};

export const Editable = Template.bind({});
Editable.args = {
  ...Readonly.args,
  readonly: false,
};
