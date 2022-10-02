import { ComponentProps } from 'react';
import { ComponentStory, ComponentMeta, ArgTypes } from '@storybook/react';
import { SubCategoryItem } from '../SubCategoryItem';

type MyArgTypes = Partial<
  Record<keyof ComponentProps<typeof SubCategoryItem>, ArgTypes[string]>
>;
const argTypes: MyArgTypes = {};

export default {
  title: 'settings/category/SubCategoryItem',
  component: SubCategoryItem,
  argTypes,
} as ComponentMeta<typeof SubCategoryItem>;

const Template: ComponentStory<typeof SubCategoryItem> = ({ ...props }) => (
  <SubCategoryItem {...props} />
);

export const Default = Template.bind({});
Default.args = {
  id: 1,
  value: '하위카테고리',
};
