import { ComponentProps } from 'react';
import { ComponentStory, ComponentMeta, ArgTypes } from '@storybook/react';
import { PostUtils } from '../PostUtils';

type MyArgTypes = Partial<
  Record<keyof ComponentProps<typeof PostUtils>, ArgTypes[string]>
>;
const argTypes: MyArgTypes = {};

export default {
  title: 'posts/detail/PostUtils',
  component: PostUtils,
  argTypes,
} as ComponentMeta<typeof PostUtils>;

const Template: ComponentStory<typeof PostUtils> = ({ ...props }) => (
  <PostUtils {...props} />
);

export const Default = Template.bind({});
Default.args = {};

export const Liked = Template.bind({});
Liked.args = {
  isLiked: true,
};
