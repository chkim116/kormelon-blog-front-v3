import { ComponentProps } from 'react';
import { ComponentStory, ComponentMeta, ArgTypes } from '@storybook/react';
import { Button } from '@nextui-org/react';
import { toast } from '@shared/services/ToastService';
import { Toast } from '../Toast';

type MyArgTypes = Partial<
  Record<keyof ComponentProps<typeof Toast>, ArgTypes[string]>
>;
const argTypes: MyArgTypes = {};

export default {
  title: 'shared/common/Toast',
  component: Toast,
  argTypes,
} as ComponentMeta<typeof Toast>;

const Template: ComponentStory<typeof Toast> = ({ ...props }) => {
  const handleOpen = () => {
    toast.open(props.status, props.message);
  };

  return <Button onClick={handleOpen}>Toast 열기</Button>;
};

export const Info = Template.bind({});
Info.args = {
  message: 'it is Toast message',
  status: 'info',
};

export const Warning = Template.bind({});
Warning.args = {
  ...Info.args,
  status: 'warning',
};

export const Success = Template.bind({});
Success.args = {
  ...Info.args,
  status: 'success',
};

export const Error = Template.bind({});
Error.args = {
  ...Info.args,
  status: 'error',
};
