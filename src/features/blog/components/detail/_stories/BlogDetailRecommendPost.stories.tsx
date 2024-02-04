import { ComponentProps } from 'react';
import { StoryFn, Meta, ArgTypes } from '@storybook/react';
import { blogFixtures } from '@fixtures/blog.fixtures';
import { BlogDetailRecommendPost } from '../BlogDetailRecommendPost';

type MyArgTypes = Partial<
  Record<keyof ComponentProps<typeof BlogDetailRecommendPost>, ArgTypes[string]>
>;
const argTypes: MyArgTypes = {};

export default {
  title: 'features/blog/detail/BlogDetailRecommendPost',
  component: BlogDetailRecommendPost,
  argTypes,
} as Meta<typeof BlogDetailRecommendPost>;

const Template: StoryFn<typeof BlogDetailRecommendPost> = ({ ...props }) => (
  <BlogDetailRecommendPost {...props} />
);

export const Default = {
  render: Template,

  args: {
    posts: blogFixtures.getBlogList(),
  },
};

export const Single = {
  render: Template,

  args: {
    posts: blogFixtures.getBlogList(1),
  },
};

export const Empty = {
  render: Template,

  args: {
    posts: blogFixtures.getBlogList(0),
  },
};
