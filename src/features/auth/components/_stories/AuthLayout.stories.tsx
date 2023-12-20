import { ComponentProps } from 'react';
import { ArgTypes, Meta, StoryFn, StoryObj } from '@storybook/react';
import AuthContainer from '@features/auth/containers/AuthContainer';
import AuthLayout from '../AuthLayout';

interface StoryProps extends ComponentProps<typeof AuthLayout> {}

type MyArgTypes = Partial<Record<keyof StoryProps, ArgTypes[string]>>;
const argTypes: MyArgTypes = {};

export default {
  title: 'features/auth/AuthLayout',
  component: AuthLayout,
  argTypes,
} as Meta;

const Template: StoryFn<StoryProps> = ({ ...props }) => (
  <AuthLayout {...props} />
);

export const Default: StoryObj<StoryProps> = {
  render: Template,

  args: {
    children: <AuthContainer />,
  },
};
