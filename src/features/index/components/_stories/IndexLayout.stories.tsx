import { ComponentProps } from 'react';
import { ArgTypes, Meta, StoryFn, StoryObj } from '@storybook/react';
import IndexLayout from '../IndexLayout';
import { IndexUserImage } from '../IndexUserImage';
import { IndexUserMenu } from '../IndexUserMenu';

interface StoryProps extends ComponentProps<typeof IndexLayout> {}

type MyArgTypes = Partial<Record<keyof StoryProps, ArgTypes[string]>>;
const argTypes: MyArgTypes = {};

export default {
  title: 'features/index/IndexLayout',
  component: IndexLayout,
  argTypes,
} as Meta;

const Template: StoryFn<StoryProps> = ({ ...props }) => (
  <IndexLayout {...props} />
);

export const Default: StoryObj<StoryProps> = {
  render: Template,

  args: {
    children: (
      <>
        <IndexUserImage />
        <IndexUserMenu />
      </>
    ),
  },
};
