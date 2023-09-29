import { ComponentProps } from 'react';
import { StoryFn, Meta, ArgTypes } from '@storybook/react';
import { faker } from '@faker-js/faker';
import { BlogWriteThumbnail } from '../BlogWriteThumbnail';

type MyArgTypes = Partial<
  Record<keyof ComponentProps<typeof BlogWriteThumbnail>, ArgTypes[string]>
>;
const argTypes: MyArgTypes = {};

export default {
  title: 'features/blog/write/BlogWriteThumbnail',
  component: BlogWriteThumbnail,
  argTypes,
} as Meta<typeof BlogWriteThumbnail>;

const Template: StoryFn<typeof BlogWriteThumbnail> = ({ ...props }) => (
  <BlogWriteThumbnail {...props} />
);

export const Default = {
  render: Template,

  args: {
    previewThumbnail: faker.image.dataUri(),
  },
};
