import { ComponentProps } from 'react';
import { StoryFn, Meta, ArgTypes } from '@storybook/react';
import { AuthLoginForm } from '../AuthLoginForm';

type MyArgTypes = Partial<
  Record<keyof ComponentProps<typeof AuthLoginForm>, ArgTypes[string]>
>;
const argTypes: MyArgTypes = {};

export default {
  title: 'features/auth/AuthLoginForm',
  component: AuthLoginForm,
  argTypes,
} as Meta<typeof AuthLoginForm>;

const Template: StoryFn<typeof AuthLoginForm> = ({ ...props }) => (
  <div className="max-w-sm">
    <AuthLoginForm {...props} />
  </div>
);

export const Default = {
  render: Template,

  args: {
    errorFieldNames: [],
    isLoading: false,
  },
};

export const Loading = {
  render: Template,

  args: {
    ...Default.args,
    isLoading: true,
  },
};

export const Error = {
  render: Template,

  args: {
    ...Default.args,
    errorFieldNames: ['email', 'password'],
  },
};
