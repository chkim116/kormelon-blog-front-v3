import { ComponentProps } from 'react';
import { ComponentStory, ComponentMeta, ArgTypes } from '@storybook/react';
import { RegisterForm } from '../RegisterForm';

type MyArgTypes = Partial<
  Record<keyof ComponentProps<typeof RegisterForm>, ArgTypes[string]>
>;
const argTypes: MyArgTypes = {};

export default {
  title: 'auth/RegisterForm',
  component: RegisterForm,
  argTypes,
} as ComponentMeta<typeof RegisterForm>;

const Template: ComponentStory<typeof RegisterForm> = ({ ...props }) => (
  <RegisterForm {...props} />
);

export const Default = Template.bind({});
Default.args = {
  errorFieldNames: [],
  isLoading: false,
  profileImage:
    'https://assets-kormelon-v2.s3.ap-northeast-2.amazonaws.com/winter.jpg',
};

export const Loading = Template.bind({});
Loading.args = {
  ...Default.args,
  isLoading: true,
};

export const Error = Template.bind({});
Error.args = {
  ...Default.args,
  errorFieldNames: ['email', 'password', 'username'],
};
