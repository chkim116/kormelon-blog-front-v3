import { ComponentProps, useState } from 'react';
import { ComponentStory, ComponentMeta, ArgTypes } from '@storybook/react';
import { Button } from '@mui/material';
import { Feedback } from '../Feedback';

type MyArgTypes = Partial<
  Record<keyof ComponentProps<typeof Feedback>, ArgTypes[string]>
>;
const argTypes: MyArgTypes = {};

export default {
  title: 'common/Feedback',
  component: Feedback,
  argTypes,
} as ComponentMeta<typeof Feedback>;

const Template: ComponentStory<typeof Feedback> = ({ ...props }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <>
      <Button onClick={handleOpen}>Alert 열기</Button>
      {isOpen && <Feedback {...props} />}
    </>
  );
};

export const Info = Template.bind({});
Info.args = {
  message: 'it is feedback message',
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
