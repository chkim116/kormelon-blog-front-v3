import { ComponentProps } from 'react';
import { ComponentStory, ComponentMeta, ArgTypes } from '@storybook/react';
import { SAMPLE_IMAGE } from '@common/constants';
import { PostWriteThumbnail } from '../PostWriteThumbnail';

type MyArgTypes = Partial<
  Record<keyof ComponentProps<typeof PostWriteThumbnail>, ArgTypes[string]>
>;
const argTypes: MyArgTypes = {};

export default {
  title: 'blog/write/PostWriteThumbnail',
  component: PostWriteThumbnail,
  argTypes,
} as ComponentMeta<typeof PostWriteThumbnail>;

const Template: ComponentStory<typeof PostWriteThumbnail> = ({ ...props }) => (
  <PostWriteThumbnail {...props} />
);

export const Default = Template.bind({});
Default.args = {
  previewThumbnail: SAMPLE_IMAGE,
};
