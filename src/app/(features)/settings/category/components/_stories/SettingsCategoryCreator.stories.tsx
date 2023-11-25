import { ComponentProps } from 'react';
import { ArgTypes, Meta, StoryFn, StoryObj } from '@storybook/react';
import { Button } from '@nextui-org/react';
import { SettingsCategoryCreator } from '../SettingsCategoryCreator';

interface StoryProps extends ComponentProps<typeof SettingsCategoryCreator> {}

type MyArgTypes = Partial<Record<keyof StoryProps, ArgTypes[string]>>;
const argTypes: MyArgTypes = {};

export default {
  title: 'features/settings/category/SettingsCategoryCreator',
  component: SettingsCategoryCreator,
  argTypes,
} as Meta;

const Template: StoryFn<StoryProps> = ({ ...props }) => (
  <SettingsCategoryCreator {...props}>
    <Button type="submit" color="primary">
      생성
    </Button>
  </SettingsCategoryCreator>
);

export const Default: StoryObj<StoryProps> = {
  render: Template,

  args: {},
};
