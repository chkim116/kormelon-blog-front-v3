import { ComponentProps, useState, useEffect } from 'react';
import { ArgTypes, Meta, StoryFn, StoryObj } from '@storybook/react';
import { Button } from '@nextui-org/react';
import { SettingsCategorySubCategoryCreator } from '../SettingsCategorySubCategoryCreator';

interface StoryProps
  extends ComponentProps<typeof SettingsCategorySubCategoryCreator> {}

type MyArgTypes = Partial<Record<keyof StoryProps, ArgTypes[string]>>;
const argTypes: MyArgTypes = {};

export default {
  title: 'features/settings/category/SettingsCategorySubCategoryCreator',
  component: SettingsCategorySubCategoryCreator,
  argTypes,
} as Meta;

const Template: StoryFn<StoryProps> = ({ ...props }) => {
  const [open, setOpen] = useState(props.isOpen);

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleOk = (value: string) => {
    handleToggle();
    props.onOk(value);
  };

  const handleClose = () => {
    handleToggle();
    props.onClose();
  };

  useEffect(() => {
    setOpen(props.isOpen);
  }, [props.isOpen]);

  return (
    <>
      <Button onClick={handleToggle}>오픈</Button>

      <SettingsCategorySubCategoryCreator
        {...props}
        isOpen={open}
        onClose={handleClose}
        onOk={handleOk}
      />
    </>
  );
};

export const Default: StoryObj<StoryProps> = {
  render: Template,

  args: {
    isOpen: false,
  },
};

export const Open: StoryObj<StoryProps> = {
  render: Template,

  args: {
    isOpen: true,
  },
};
