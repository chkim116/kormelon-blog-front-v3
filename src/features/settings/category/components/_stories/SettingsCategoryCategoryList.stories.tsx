import { ComponentProps } from 'react';
import { StoryFn, Meta, ArgTypes, StoryObj } from '@storybook/react';
import { categoryFixtures } from '@fixtures/category.fixtures';
import { SettingsCategoryCategoryList } from '../SettingsCategoryCategoryList';

interface StoryProps
  extends ComponentProps<typeof SettingsCategoryCategoryList> {}

type MyArgTypes = Partial<Record<keyof StoryProps, ArgTypes[string]>>;
const argTypes: MyArgTypes = {};

export default {
  title: 'features/settings/category/SettingsCategoryCategoryList',
  component: SettingsCategoryCategoryList,
  argTypes,
} as Meta<typeof SettingsCategoryCategoryList>;

const Template: StoryFn<typeof SettingsCategoryCategoryList> = ({
  ...props
}) => <SettingsCategoryCategoryList {...props} />;

export const Default: StoryObj<StoryProps> = {
  render: Template,

  args: {
    categories: categoryFixtures.getCategories(10, 5),
  },
};
