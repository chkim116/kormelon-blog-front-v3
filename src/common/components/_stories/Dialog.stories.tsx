import { ComponentProps, useEffect, useState } from 'react';
import { StoryFn, Meta, ArgTypes, StoryObj } from '@storybook/react';
import { Button } from '@nextui-org/react';
import { Dialog } from '../Dialog';

interface StoryProps extends ComponentProps<typeof Dialog> {}

type MyArgTypes = Partial<Record<keyof StoryProps, ArgTypes[string]>>;
const argTypes: MyArgTypes = {};

export default {
  title: 'common/Dialog',
  component: Dialog,
  argTypes,
} as Meta<typeof Dialog>;

const Template: StoryFn<StoryProps> = ({ ...props }) => {
  const [open, setOpen] = useState(props.open);

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  return (
    <>
      <Button onClick={() => setOpen(true)}>오픈</Button>
      <Dialog
        {...props}
        open={open}
        onClose={() => setOpen(false)}
        onOk={(close) => {
          close();
          setOpen(false);
        }}
      />
    </>
  );
};

export const Default: StoryObj<StoryProps> = {
  render: Template,

  args: {
    open: true,
    text: '다이얼로그입니다.',
  },
};

export const LongText: StoryObj<StoryProps> = {
  render: Template,

  args: {
    ...Default.args,
    text: '다이얼로그입니다다이얼로그입니다다이얼로그입니다다이얼로그입니다다이얼로그입니다다이얼로그입니다다이얼로그입니다다이얼로그입니다다이얼로그입니다다이얼로그입니다다이얼로그입니다.',
  },
};

export const Trigger: StoryObj<StoryProps> = {
  render: Template,

  args: {
    ...Default.args,
    open: false,
  },
};
