import { ComponentProps } from 'react';
import { StoryFn, Meta, ArgTypes } from '@storybook/react';
import { BlogWriteTagSearch } from '../BlogWriteTagSearch';

type MyArgTypes = Partial<
  Record<keyof ComponentProps<typeof BlogWriteTagSearch>, ArgTypes[string]>
>;
const argTypes: MyArgTypes = {};

export default {
  title: 'features/blog/write/BlogWriteTagSearch',
  component: BlogWriteTagSearch,
  argTypes,
} as Meta<typeof BlogWriteTagSearch>;

const Template: StoryFn<typeof BlogWriteTagSearch> = ({ ...props }) => (
  <BlogWriteTagSearch {...props} />
);

export const Default = {
  render: Template,

  args: {
    selectedTags: Array.from({ length: 10 }, (_, i) => ({
      id: i,
      value: String(i),
      posts: [],
    })),
    searchedTags: Array.from({ length: 10 }, (_, i) => ({
      id: i,
      value: String(i),
      posts: [],
    })),
  },
};

export const NoOptions = {
  render: Template,

  args: {
    ...Default.args,
    searchedTags: [],
  },
};

export const NoSelected = {
  render: Template,

  args: {
    ...Default.args,
    selectedTags: [],
  },
};
