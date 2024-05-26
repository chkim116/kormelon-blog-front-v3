import { ComponentProps } from 'react';
import { Meta, ArgTypes, StoryObj, StoryFn } from '@storybook/react';
import { Button } from '@nextui-org/react';
import { toast } from '@common/lib/ToastService';
import { Toast } from '../Toast';

interface StoryProps extends ComponentProps<typeof Toast> {}

type MyArgTypes = Partial<Record<keyof StoryProps, ArgTypes[string]>>;
const argTypes: MyArgTypes = {};

export default {
  title: 'common/Toast',
  component: Toast,
  argTypes,
} as Meta<typeof Toast>;

const Template: StoryFn<StoryProps> = ({ ...props }) => {
  const handleOpen = () => {
    toast.open(props.status, props.message);
  };

  return <Button onClick={handleOpen}>Toast 열기</Button>;
};

export const Info: StoryObj<StoryProps> = {
  render: Template,

  args: {
    message: 'it is Toast message',
    status: 'info',
  },
};

export const Warning: StoryObj<StoryProps> = {
  render: Template,

  args: {
    ...Info.args,
    status: 'warning',
  },
};

export const Success: StoryObj<StoryProps> = {
  render: Template,

  args: {
    ...Info.args,
    status: 'success',
  },
};

export const Error: StoryObj<StoryProps> = {
  render: Template,

  args: {
    ...Info.args,
    status: 'error',
  },
};
