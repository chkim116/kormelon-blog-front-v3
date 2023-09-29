import { ComponentProps } from 'react';
import { ArgTypes, Meta, StoryFn, StoryObj } from '@storybook/react';
import { LayoutFooter } from '../LayoutFooter';

interface StoryProps extends ComponentProps<typeof LayoutFooter> {}

type MyArgTypes = Partial<Record<keyof StoryProps, ArgTypes[string]>>;
const argTypes: MyArgTypes = {};

export default {
  title: 'shared/layout/LayoutFooter',
  component: LayoutFooter,
  argTypes,
} as Meta;

const Template: StoryFn<StoryProps> = ({ ...props }) => (
  <LayoutFooter {...props} />
);

export const Default: StoryObj<StoryProps> = {
  render: Template,

  args: {
    view: {
      today: '120',
      total: '10,000',
    },
  },
};
