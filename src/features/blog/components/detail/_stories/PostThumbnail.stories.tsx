import { ComponentProps } from 'react';
import { ComponentStory, ComponentMeta, ArgTypes } from '@storybook/react';
import { SAMPLE_IMAGE } from '@common/constants';
import { PostThumbnail } from '../PostThumbnail';

type MyArgTypes = Partial<
  Record<keyof ComponentProps<typeof PostThumbnail>, ArgTypes[string]>
>;
const argTypes: MyArgTypes = {};

export default {
  title: 'posts/detail/PostThumbnail',
  component: PostThumbnail,
  argTypes,
} as ComponentMeta<typeof PostThumbnail>;

const Template: ComponentStory<typeof PostThumbnail> = ({ ...props }) => (
  <PostThumbnail {...props} />
);

export const Default = Template.bind({});
Default.args = {
  src: SAMPLE_IMAGE,
  alt: 'winter',
};
