import { ComponentProps } from 'react';
import { ArgTypes, Meta, StoryFn, StoryObj } from '@storybook/react';
import { blogFixtures } from '@fixtures/blog.fixtures';
import { BlogCommonCardGrid } from '../BlogCommonCardGrid';

interface StoryProps extends ComponentProps<typeof BlogCommonCardGrid> {}

type MyArgTypes = Partial<Record<keyof StoryProps, ArgTypes[string]>>;
const argTypes: MyArgTypes = {};

export default {
  title: 'features/blog/common/BlogCommonCardGrid',
  component: BlogCommonCardGrid,
  argTypes,
} as Meta;

const Template: StoryFn<StoryProps> = ({ ...props }) => (
  <div className="max-w-6xl">
    <BlogCommonCardGrid {...props} />
  </div>
);

export const Default: StoryObj<StoryProps> = {
  render: Template,

  args: {
    blogs: blogFixtures.getBlogList(),
    // blogs: createPosts(6),
  },
};

export const CustomTitle: StoryObj<StoryProps> = {
  render: Template,

  args: {
    ...Default.args,
    title: 'Development Post',
  },
};

export const ManyPosts: StoryObj<StoryProps> = {
  render: Template,

  args: {
    ...Default.args,
    blogs: blogFixtures.getBlogList(12),
  },
};
