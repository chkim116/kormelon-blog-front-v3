import { ComponentProps } from 'react';
import { StoryFn, Meta, ArgTypes } from '@storybook/react';
import { SAMPLE_IMAGE } from '@shared/constants';
import { BlogWriteContent } from '../BlogWriteContent';

type MyArgTypes = Partial<
  Record<keyof ComponentProps<typeof BlogWriteContent>, ArgTypes[string]>
>;
const argTypes: MyArgTypes = {};

export default {
  title: 'features/blog/write/BlogWriteContent',
  component: BlogWriteContent,
  argTypes,
} as Meta<typeof BlogWriteContent>;

const Template: StoryFn<typeof BlogWriteContent> = ({ ...props }) => (
  <BlogWriteContent {...props} />
);

export const Default = {
  render: Template,

  args: {
    content: `# hello\n![image](${SAMPLE_IMAGE})\n\n> hi`,
  },
};
