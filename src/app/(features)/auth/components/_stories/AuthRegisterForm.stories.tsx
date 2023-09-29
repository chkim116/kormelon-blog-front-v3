import { ComponentProps } from 'react';
import { StoryFn, Meta, ArgTypes } from '@storybook/react';
import { faker } from '@faker-js/faker';
import { AuthRegisterForm } from '../AuthRegisterForm';

type MyArgTypes = Partial<
  Record<keyof ComponentProps<typeof AuthRegisterForm>, ArgTypes[string]>
>;
const argTypes: MyArgTypes = {};

export default {
  title: 'features/auth/AuthRegisterForm',
  component: AuthRegisterForm,
  argTypes,
} as Meta<typeof AuthRegisterForm>;

const Template: StoryFn<typeof AuthRegisterForm> = ({ ...props }) => (
  <div className="max-w-sm">
    <AuthRegisterForm {...props} />
  </div>
);

export const Default = {
  render: Template,

  args: {
    errorFieldNames: [],
    isLoading: false,
    profileImage: faker.image.avatar(),
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
    errorFieldNames: ['email', 'password', 'username'],
  },
};
