import { ComponentProps } from 'react';
import { ArgTypes, Meta, StoryFn, StoryObj } from '@storybook/react';
import { Footer } from '../Footer';

interface StoryProps extends ComponentProps<typeof Footer> {}

type MyArgTypes = Partial<Record<keyof StoryProps, ArgTypes[string]>>;
const argTypes: MyArgTypes = {};

export default {
  title: 'shared/Footer',
  component: Footer,
  argTypes,
} as Meta;

const Template: StoryFn<StoryProps> = ({ ...props }) => <Footer {...props} />;

export const Default: StoryObj<StoryProps> = {
  render: Template,

  args: {
    view: {
      today: '120',
      total: '10,000',
    },
  },
};
