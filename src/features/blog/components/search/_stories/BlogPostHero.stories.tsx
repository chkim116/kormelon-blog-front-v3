import { ComponentProps } from 'react';
import { ComponentStory, ComponentMeta, ArgTypes } from '@storybook/react';
import { BlogPostHero } from '../BlogPostHero';

type MyArgTypes = Partial<
  Record<keyof ComponentProps<typeof BlogPostHero>, ArgTypes[string]>
>;
const argTypes: MyArgTypes = {};

export default {
  title: 'blog/search/BlogPostHero',
  component: BlogPostHero,
  argTypes,
} as ComponentMeta<typeof BlogPostHero>;

const Template: ComponentStory<typeof BlogPostHero> = () => <BlogPostHero />;

export const Default = Template.bind({});
Default.args = {};
