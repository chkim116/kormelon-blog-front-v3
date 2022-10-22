import { ComponentProps } from 'react';
import { ComponentStory, ComponentMeta, ArgTypes } from '@storybook/react';
import { PostWriteThumbnail } from '../PostWriteThumbnail';

type MyArgTypes = Partial<
  Record<keyof ComponentProps<typeof PostWriteThumbnail>, ArgTypes[string]>
>;
const argTypes: MyArgTypes = {};

export default {
  title: 'posts/write/PostWriteThumbnail',
  component: PostWriteThumbnail,
  argTypes,
} as ComponentMeta<typeof PostWriteThumbnail>;

const Template: ComponentStory<typeof PostWriteThumbnail> = ({ ...props }) => (
  <PostWriteThumbnail {...props} />
);

export const Default = Template.bind({});
Default.args = {};
