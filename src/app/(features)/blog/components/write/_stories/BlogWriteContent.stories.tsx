import { ComponentProps } from 'react';
import { StoryFn, Meta, ArgTypes } from '@storybook/react';
import { faker } from '@faker-js/faker';
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
    content: `# hello\n![image](${faker.image.dataUri()})\n\n> hi`,
  },
};
