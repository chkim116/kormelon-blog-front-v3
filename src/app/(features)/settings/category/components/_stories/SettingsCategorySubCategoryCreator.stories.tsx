import { ComponentProps, useRef } from 'react';
import { ArgTypes, Meta, StoryFn, StoryObj } from '@storybook/react';
import { Button } from '@nextui-org/react';
import { actions } from '@storybook/addon-actions';
import {
  SettingsCategorySubCategoryCreator,
  SettingsCategorySubCategoryCreatorHandle,
} from '../SettingsCategorySubCategoryCreator';

interface StoryProps
  extends ComponentProps<typeof SettingsCategorySubCategoryCreator> {}

type MyArgTypes = Partial<Record<keyof StoryProps, ArgTypes[string]>>;
const argTypes: MyArgTypes = {};

export default {
  title: 'features/settings/category/SettingsCategorySubCategoryCreator',
  component: SettingsCategorySubCategoryCreator,
  argTypes,
} as Meta;

const handlers = actions('onTestOk', 'onTestCancel');
const Template: StoryFn<StoryProps> = ({ ...props }) => {
  const refDialog = useRef<SettingsCategorySubCategoryCreatorHandle | null>(
    null,
  );

  const handleOpen = () => {
    refDialog.current
      ?.open()
      .then(handlers.onTestOk)
      .catch(handlers.onTestCancel);
  };

  return (
    <>
      <Button onClick={handleOpen}>오픈</Button>

      <SettingsCategorySubCategoryCreator {...props} ref={refDialog} />
    </>
  );
};

export const Default: StoryObj<StoryProps> = {
  render: Template,

  args: {},
};
