import { ComponentProps } from 'react';
import { ArgTypes, Meta, StoryFn, StoryObj } from '@storybook/react';
import { BlogDetailCommentBodyText } from '../BlogDetailCommentBodyText';

interface StoryProps extends ComponentProps<typeof BlogDetailCommentBodyText> {}

type MyArgTypes = Partial<Record<keyof StoryProps, ArgTypes[string]>>;
const argTypes: MyArgTypes = {};

export default {
  title: 'features/blog/detail/BlogDetailCommentBodyText',
  component: BlogDetailCommentBodyText,
  argTypes,
} as Meta;

const Template: StoryFn<StoryProps> = ({ ...props }) => (
  <>
    <BlogDetailCommentBodyText {...props} />
  </>
);

export const Default: StoryObj<StoryProps> = {
  render: Template,

  args: {
    value:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore earum, laboriosam adipisci, quam velit ab delectus impedit expedita a, assumenda ut temporibus provident distinctio animi. Voluptatem minus dolorum id nulla.',
    editable: false,
  },
};

export const Editable: StoryObj<StoryProps> = {
  render: Template,

  args: {
    ...Default.args,
    editable: true,
  },
};
