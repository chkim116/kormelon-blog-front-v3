import { ComponentProps } from 'react';
import { StoryFn, Meta, ArgTypes } from '@storybook/react';
import { blogFixtures } from '@fixtures/blog.fixtures';
import { BlogDetailNearPost } from '../BlogDetailNearPost';

type MyArgTypes = Partial<
  Record<keyof ComponentProps<typeof BlogDetailNearPost>, ArgTypes[string]>
>;
const argTypes: MyArgTypes = {};

export default {
  title: 'features/blog/detail/BlogDetailNearPost',
  component: BlogDetailNearPost,
  argTypes,
} as Meta<typeof BlogDetailNearPost>;

const Template: StoryFn<typeof BlogDetailNearPost> = ({ ...props }) => (
  <BlogDetailNearPost {...props} />
);

export const Default = {
  render: Template,

  args: {
    nearPost: blogFixtures.getNearPost(),
  },
};

export const NextNull = {
  render: Template,

  args: {
    nearPost: {
      prev: blogFixtures.getNearPost().prev,
      next: null,
    },
  },
};

export const PrevNull = {
  render: Template,

  args: {
    nearPost: {
      next: blogFixtures.getNearPost().next,
      prev: null,
    },
  },
};

export const Null = {
  render: Template,

  args: {
    nearPost: {
      next: null,
      prev: null,
    },
  },
};
