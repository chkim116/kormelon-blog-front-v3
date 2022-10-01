import { ComponentProps } from 'react';
import { ComponentStory, ComponentMeta, ArgTypes } from '@storybook/react';
import { LoginForm } from '../LoginForm';

type MyArgTypes = Partial<
  Record<keyof ComponentProps<typeof LoginForm>, ArgTypes[string]>
>;
const argTypes: MyArgTypes = {};

export default {
  title: 'auth/LoginForm',
  component: LoginForm,
  argTypes,
} as ComponentMeta<typeof LoginForm>;

const Template: ComponentStory<typeof LoginForm> = ({ ...props }) => (
  <LoginForm {...props} />
);

export const Default = Template.bind({});
Default.args = {
  errorFieldNames: [],
  isLoading: false,
};

export const Loading = Template.bind({});
Loading.args = {
  ...Default.args,
  isLoading: true,
};

export const Error = Template.bind({});
Error.args = {
  ...Default.args,
  errorFieldNames: ['email', 'password'],
};
