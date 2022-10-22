import { ComponentProps } from 'react';
import { ComponentStory, ComponentMeta, ArgTypes } from '@storybook/react';
import { PostContentFooter } from '../PostContentFooter';

type MyArgTypes = Partial<
  Record<keyof ComponentProps<typeof PostContentFooter>, ArgTypes[string]>
>;
const argTypes: MyArgTypes = {};

export default {
  title: 'blog/detail/PostContentFooter',
  component: PostContentFooter,
  argTypes,
} as ComponentMeta<typeof PostContentFooter>;

const Template: ComponentStory<typeof PostContentFooter> = ({ ...props }) => (
  <PostContentFooter {...props} />
);

export const Default = Template.bind({});
Default.args = {
  isLiked: false,
  view: 10000,
};

export const Liked = Template.bind({});
Liked.args = {
  ...Default.args,
  isLiked: true,
};
