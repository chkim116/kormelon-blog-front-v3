import { ComponentProps } from 'react';
import { ComponentStory, ComponentMeta, ArgTypes } from '@storybook/react';
import { CategoryStack } from '../CategoryStack';

type MyArgTypes = Partial<
  Record<keyof ComponentProps<typeof CategoryStack>, ArgTypes[string]>
>;
const argTypes: MyArgTypes = {};

export default {
  title: 'blog/search/CategoryStack',
  component: CategoryStack,
  argTypes,
} as ComponentMeta<typeof CategoryStack>;

const Template: ComponentStory<typeof CategoryStack> = ({ ...props }) => (
  <CategoryStack {...props} />
);

export const Default = Template.bind({});
Default.args = {
  categories: [
    { id: 1, value: '카테고리' },
    { id: 2, value: '카테고리2' },
    { id: 3, value: '카테고리3' },
    { id: 4, value: '카테고리4' },
    { id: 5, value: '카테고리5' },
  ],
};

export const Selected = Template.bind({});
Selected.args = {
  ...Default.args,
  openId: 2,
};
