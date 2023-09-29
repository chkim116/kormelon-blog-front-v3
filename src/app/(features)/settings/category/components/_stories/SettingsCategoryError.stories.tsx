import { ComponentProps } from 'react';
import { ArgTypes, Meta, StoryFn, StoryObj } from '@storybook/react';
import { SettingsCategoryError } from '../SettingsCategoryError';

interface StoryProps extends ComponentProps<typeof SettingsCategoryError> {}

type MyArgTypes = Partial<Record<keyof StoryProps, ArgTypes[string]>>;
const argTypes: MyArgTypes = {};

export default {
  title: 'features/settings/category/SettingsCategoryError',
  component: SettingsCategoryError,
  argTypes,
} as Meta;

const Template: StoryFn<StoryProps> = ({ ...props }) => (
  <SettingsCategoryError {...props} />
);

export const Default: StoryObj<StoryProps> = {
  render: Template,

  args: {},
};
