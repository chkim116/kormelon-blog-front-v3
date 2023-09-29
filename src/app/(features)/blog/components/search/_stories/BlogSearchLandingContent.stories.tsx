import { ComponentProps } from 'react';
import { ArgTypes, Meta, StoryFn, StoryObj } from '@storybook/react';
import { BlogSearchLandingContent } from '../BlogSearchLandingContent';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface StoryProps extends ComponentProps<typeof BlogSearchLandingContent> {}

type MyArgTypes = Partial<Record<keyof StoryProps, ArgTypes[string]>>;
const argTypes: MyArgTypes = {};

export default {
  title: 'features/blog/search/BlogSearchLandingContent',
  component: BlogSearchLandingContent,
  argTypes,
} as Meta;

const Template: StoryFn<StoryProps> = ({ ...props }) => (
  <BlogSearchLandingContent {...props} />
);

export const Default: StoryObj<StoryProps> = {
  render: Template,

  args: {},
};

export const CategoryLanding: StoryObj<StoryProps> = {
  render: Template,

  args: {
    categoryName: 'Development',
  },
};
