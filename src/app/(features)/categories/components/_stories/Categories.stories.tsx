import { ComponentProps } from 'react';
import { ArgTypes, Meta, StoryFn, StoryObj } from '@storybook/react';
import { CategoryModel } from '@domain/uiStates';
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

function createCategories(length: number): CategoryModel[] {
  return Array.from({ length }, (_, i) => ({
    id: i,
    value: '카테고리카테고리카테고리카테고리' + i,
    subCategories: [],
    posts: i,
  }));
}

export const Default: StoryObj<StoryProps> = {
  render: Template,

  args: {
    categories: createCategories(9),
  },
};

export const Empty: StoryObj<StoryProps> = {
  render: Template,

  args: {
    categories: [],
  },
};
