import { ComponentProps } from 'react';
import { ArgTypes, Meta, StoryFn, StoryObj } from '@storybook/react';
import { blogFixtures } from '@fixtures/blog.fixtures';
import { BlogCommonCard } from '../BlogCommonCard';

interface StoryProps extends ComponentProps<typeof BlogCommonCard> {}

type MyArgTypes = Partial<Record<keyof StoryProps, ArgTypes[string]>>;
const argTypes: MyArgTypes = {};

export default {
  title: 'features/blog/common/BlogCommonCard',
  component: BlogCommonCard,
  argTypes,
} as Meta;

const Template: StoryFn<StoryProps> = ({ ...props }) => (
  <BlogCommonCard {...props} />
);

export const Default: StoryObj<StoryProps> = {
  render: Template,

  args: {
    ...blogFixtures.getBlogList()[0],
  },
};
