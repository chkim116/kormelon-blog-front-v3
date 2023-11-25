import { ComponentProps } from 'react';
import { ArgTypes, Meta, StoryFn, StoryObj } from '@storybook/react';
import { categoryFixtures } from '@fixtures/category.fixtures';
import { Categories } from '../Categories';

interface StoryProps extends ComponentProps<typeof Categories> {}

type MyArgTypes = Partial<Record<keyof StoryProps, ArgTypes[string]>>;
const argTypes: MyArgTypes = {};

export default {
  title: 'features/categories/Categories',
  component: Categories,
  argTypes,
} as Meta;

const Template: StoryFn<StoryProps> = ({ ...props }) => (
  <Categories {...props} />
);

export const Default: StoryObj<StoryProps> = {
  render: Template,

  args: {
    categories: categoryFixtures.getCategories(9),
  },
};

export const Empty: StoryObj<StoryProps> = {
  render: Template,

  args: {
    categories: [],
  },
};
