import { ComponentProps, useState } from 'react';
import { ComponentStory, ComponentMeta, ArgTypes } from '@storybook/react';
import { Button } from '@mui/material';
import { Dialog } from '../Dialog';

type MyArgTypes = Partial<
  Record<keyof ComponentProps<typeof Dialog>, ArgTypes[string]>
>;
const argTypes: MyArgTypes = {};

export default {
  title: 'common/Dialog',
  component: Dialog,
  argTypes,
} as ComponentMeta<typeof Dialog>;

const Template: ComponentStory<typeof Dialog> = ({ ...props }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>오픈</Button>
      <Dialog open={open} {...props} />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  open: true,
  text: '다이얼로그입니다.',
};

export const LongText = Template.bind({});
LongText.args = {
  ...Default.args,
  text: '다이얼로그입니다다이얼로그입니다다이얼로그입니다다이얼로그입니다다이얼로그입니다다이얼로그입니다다이얼로그입니다다이얼로그입니다다이얼로그입니다다이얼로그입니다다이얼로그입니다.',
};

export const Trigger = Template.bind({});
Trigger.args = {
  ...Default.args,
  open: false,
};
