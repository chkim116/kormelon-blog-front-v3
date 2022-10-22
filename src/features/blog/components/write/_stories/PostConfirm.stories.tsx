import { ComponentProps } from 'react';
import { ComponentStory, ComponentMeta, ArgTypes } from '@storybook/react';
import { PostConfirm } from '../PostConfirm';

type MyArgTypes = Partial<
  Record<keyof ComponentProps<typeof PostConfirm>, ArgTypes[string]>
>;
const argTypes: MyArgTypes = {};

export default {
  title: 'blog/write/PostConfirm',
  component: PostConfirm,
  argTypes,
} as ComponentMeta<typeof PostConfirm>;

const Template: ComponentStory<typeof PostConfirm> = ({ ...props }) => (
  <PostConfirm {...props} />
);

export const Default = Template.bind({});
Default.args = {};

export const Private = Template.bind({});
Private.args = {
  isPrivate: true,
};
