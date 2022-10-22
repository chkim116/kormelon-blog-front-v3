import { ComponentProps } from 'react';
import { ComponentStory, ComponentMeta, ArgTypes } from '@storybook/react';
import { BlogPostCategoryTab } from '../BlogPostCategoryTab';

type MyArgTypes = Partial<
  Record<keyof ComponentProps<typeof BlogPostCategoryTab>, ArgTypes[string]>
>;
const argTypes: MyArgTypes = {};

export default {
  title: 'blog/search/BlogPostCategoryTab',
  component: BlogPostCategoryTab,
  argTypes,
} as ComponentMeta<typeof BlogPostCategoryTab>;

const Template: ComponentStory<typeof BlogPostCategoryTab> = ({ ...props }) => (
  <BlogPostCategoryTab {...props} />
);

export const Default = Template.bind({});
Default.args = {
  categories: [{ id: 1, value: 'hi', subCategories: [] }],
};
