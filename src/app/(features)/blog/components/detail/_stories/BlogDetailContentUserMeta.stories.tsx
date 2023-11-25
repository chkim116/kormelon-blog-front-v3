import { ComponentProps } from 'react';
import { ArgTypes, Meta, StoryFn, StoryObj } from '@storybook/react';
import { BlogDetailContentUserMeta } from '../BlogDetailContentUserMeta';

interface StoryProps extends ComponentProps<typeof BlogDetailContentUserMeta> {}

type MyArgTypes = Partial<Record<keyof StoryProps, ArgTypes[string]>>;
const argTypes: MyArgTypes = {};

export default {
  title: 'features/blog/detail/BlogDetailContentUserMeta',
  component: BlogDetailContentUserMeta,
  argTypes,
} as Meta;

const Template: StoryFn<StoryProps> = ({ ...props }) => (
  <BlogDetailContentUserMeta {...props} />
);

export const Default: StoryObj<StoryProps> = {
  render: Template,

  args: {},
};
