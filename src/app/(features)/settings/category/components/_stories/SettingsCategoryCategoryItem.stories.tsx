import { ComponentProps } from 'react';
import { ArgTypes, Meta, StoryFn, StoryObj } from '@storybook/react';
import { faker } from '@faker-js/faker';
import { SettingsCategoryCategoryItem } from '../SettingsCategoryCategoryItem';

interface StoryProps
  extends ComponentProps<typeof SettingsCategoryCategoryItem> {}

type MyArgTypes = Partial<Record<keyof StoryProps, ArgTypes[string]>>;
const argTypes: MyArgTypes = {};

export default {
  title: 'features/settings/category/SettingsCategoryCategoryItem',
  component: SettingsCategoryCategoryItem,
  argTypes,
} as Meta;

const Template: StoryFn<StoryProps> = ({ ...props }) => (
  <SettingsCategoryCategoryItem {...props} />
);

export const Default: StoryObj<StoryProps> = {
  render: Template,

  args: {
    id: 1,
    value: faker.lorem.words(),
  },
};
