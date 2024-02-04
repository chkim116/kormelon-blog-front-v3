import { ComponentProps } from 'react';
import { ArgTypes, Meta, StoryFn, StoryObj } from '@storybook/react';
import { BlogCommonPostEmpty } from '../BlogCommonPostEmpty';

interface StoryProps extends ComponentProps<typeof BlogCommonPostEmpty> {}

type MyArgTypes = Partial<Record<keyof StoryProps, ArgTypes[string]>>;
const argTypes: MyArgTypes = {};

export default {
  title: 'features/blog/common/BlogCommonPostEmpty',
  component: BlogCommonPostEmpty,
  argTypes,
} as Meta;

const Template: StoryFn<StoryProps> = ({ ...props }) => (
  <BlogCommonPostEmpty {...props} />
);

export const Default: StoryObj<StoryProps> = {
  render: Template,

  args: {},
};
