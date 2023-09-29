import { ComponentProps } from 'react';
import { StoryFn, Meta, ArgTypes } from '@storybook/react';
import { SettingsCategoryExtraAction } from '../SettingsCategoryExtraAction';

type MyArgTypes = Partial<
  Record<
    keyof ComponentProps<typeof SettingsCategoryExtraAction>,
    ArgTypes[string]
  >
>;
const argTypes: MyArgTypes = {};

export default {
  title: 'features/settings/category/SettingsCategoryExtraAction',
  component: SettingsCategoryExtraAction,
  argTypes,
} as Meta<typeof SettingsCategoryExtraAction>;

const Template: StoryFn<typeof SettingsCategoryExtraAction> = ({
  ...props
}) => <SettingsCategoryExtraAction {...props} />;

export const Default = {
  render: Template,

  args: {
    isEditMode: false,
  },
};

export const Edit = {
  render: Template,

  args: {
    isEditMode: true,
  },
};
