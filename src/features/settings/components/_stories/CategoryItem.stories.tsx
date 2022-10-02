import { ComponentProps } from 'react';
import { ComponentStory, ComponentMeta, ArgTypes } from '@storybook/react';
import { CategoryItem } from '../CategoryItem';

type MyArgTypes = Partial<
  Record<keyof ComponentProps<typeof CategoryItem>, ArgTypes[string]>
>;
const argTypes: MyArgTypes = {};

export default {
  title: 'settings/category/CategoryItem',
  component: CategoryItem,
  argTypes,
} as ComponentMeta<typeof CategoryItem>;

const Template: ComponentStory<typeof CategoryItem> = ({ ...props }) => (
  <CategoryItem {...props} />
);

export const Default = Template.bind({});
Default.args = {
  id: 1,
  value: '상위카테고리',
  subCategories: [
    {
      id: 1,
      value: '하위카테고리',
      categoryId: 1,
    },
  ],
  openIds: [1],
};

export const Closed = Template.bind({});
Closed.args = {
  id: 1,
  value: '상위카테고리',
  subCategories: [
    {
      id: 1,
      value: '하위카테고리',
      categoryId: 1,
    },
  ],
  openIds: [],
};
