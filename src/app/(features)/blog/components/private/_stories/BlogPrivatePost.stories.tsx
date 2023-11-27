import { ComponentProps } from 'react';
import { StoryFn, Meta, ArgTypes, StoryObj } from '@storybook/react';
import { blogFixtures } from '@fixtures/blog.fixtures';
import { BlogPrivatePost } from '../BlogPrivatePost';

interface StoryProps extends ComponentProps<typeof BlogPrivatePost> {}

type MyArgTypes = Partial<Record<keyof StoryProps, ArgTypes[string]>>;
const argTypes: MyArgTypes = {};

export default {
  title: 'features/blog/private/BlogPrivatePost',
  component: BlogPrivatePost,
  argTypes,
} as Meta<typeof BlogPrivatePost>;

const Template: StoryFn<typeof BlogPrivatePost> = ({ ...props }) => (
  <BlogPrivatePost {...props} />
);

const getPrivatePosts = (length: number) =>
  blogFixtures
    .getBlogList(length)
    .map((value) => ({ ...value, isPrivate: true }));

export const Default: StoryObj<StoryProps> = {
  render: Template,

  args: {
    privateTotal: 3,
    privatePosts: getPrivatePosts(3),
  },
};

export const ManyPosts = {
  render: Template,

  args: {
    ...Default.args,
    privateTotal: 30,
    privatePosts: getPrivatePosts(30),
  },
};
