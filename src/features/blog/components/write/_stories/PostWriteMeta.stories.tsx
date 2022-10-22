import { ComponentProps } from 'react';
import { ComponentStory, ComponentMeta, ArgTypes } from '@storybook/react';
import { PostWriteMeta } from '../PostWriteMeta';

type MyArgTypes = Partial<
  Record<keyof ComponentProps<typeof PostWriteMeta>, ArgTypes[string]>
>;
const argTypes: MyArgTypes = {};

export default {
  title: 'blog/write/PostWriteMeta',
  component: PostWriteMeta,
  argTypes,
} as ComponentMeta<typeof PostWriteMeta>;

const Template: ComponentStory<typeof PostWriteMeta> = ({ ...props }) => (
  <PostWriteMeta {...props} />
);

export const Default = Template.bind({});
Default.args = {};
