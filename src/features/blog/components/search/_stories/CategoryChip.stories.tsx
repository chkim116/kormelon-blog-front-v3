import { ComponentProps } from 'react';
import { ComponentStory, ComponentMeta, ArgTypes } from '@storybook/react';
import { CategoryChip } from '../CategoryChip';

type MyArgTypes = Partial<
  Record<keyof ComponentProps<typeof CategoryChip>, ArgTypes[string]>
>;
const argTypes: MyArgTypes = {};

export default {
  title: 'posts/search/CategoryChip',
  component: CategoryChip,
  argTypes,
} as ComponentMeta<typeof CategoryChip>;

const Template: ComponentStory<typeof CategoryChip> = ({ ...props }) => (
  <CategoryChip {...props} />
);

export const Default = Template.bind({});
Default.args = {
  id: 1,
  value: '카테고리1',
};

export const Selected = Template.bind({});
Selected.args = {
  ...Default.args,
  selected: true,
};
