import { ComponentProps } from 'react';
import { ComponentStory, ComponentMeta, ArgTypes } from '@storybook/react';
import { PostTagSearch } from '../PostTagSearch';

type MyArgTypes = Partial<
  Record<keyof ComponentProps<typeof PostTagSearch>, ArgTypes[string]>
>;
const argTypes: MyArgTypes = {};

export default {
  title: 'posts/write/PostTagSearch',
  component: PostTagSearch,
  argTypes,
} as ComponentMeta<typeof PostTagSearch>;

const Template: ComponentStory<typeof PostTagSearch> = ({ ...props }) => (
  <PostTagSearch {...props} />
);

export const Default = Template.bind({});
Default.args = {
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
};

export const NoOptions = Template.bind({});
NoOptions.args = {
  ...Default.args,
  searchedTags: [],
};

export const NoSelected = Template.bind({});
NoSelected.args = {
  ...Default.args,
  selectedTags: [],
};
