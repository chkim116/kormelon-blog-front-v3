import { ComponentProps } from 'react';
import { ArgTypes, Meta, StoryFn, StoryObj } from '@storybook/react';
import { faker } from '@faker-js/faker';
import { SettingsCategorySubCategoryItem } from '../SettingsCategorySubCategoryItem';

interface StoryProps
  extends ComponentProps<typeof SettingsCategorySubCategoryItem> {}

type MyArgTypes = Partial<Record<keyof StoryProps, ArgTypes[string]>>;
const argTypes: MyArgTypes = {};

export default {
  title: 'features/settings/category/SettingsCategorySubCategoryItem',
  component: SettingsCategorySubCategoryItem,
  argTypes,
} as Meta;

const Template: StoryFn<StoryProps> = ({ ...props }) => (
  <ul>
    <SettingsCategorySubCategoryItem {...props} />
  </ul>
);

export const Default: StoryObj<StoryProps> = {
  render: Template,

  args: {
    id: 1,
    value: faker.lorem.words(),
  },
};

export const LongText: StoryObj<StoryProps> = {
  render: Template,

  args: {
    ...Default.args,
    value: faker.lorem.paragraph(),
  },
};
