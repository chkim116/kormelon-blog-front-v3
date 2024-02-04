import { ComponentProps } from 'react';
import { StoryFn, Meta, ArgTypes } from '@storybook/react';
import { faker } from '@faker-js/faker';
import { Button } from '@nextui-org/react';
import AuthRegisterForm from '../AuthRegisterForm';

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
    <AuthRegisterForm {...props}>
      <Button
        className="w-full"
        type="submit"
        color="primary"
        data-cy="signInButton"
      >
        Sign In
      </Button>
    </AuthRegisterForm>
  </div>
);

export const Default = {
  render: Template,

  args: {
    isLoading: false,
  },
};

export const ProfileImage = {
  render: Template,

  args: {
    ...Default.args,
    profileImage: faker.image.avatar(),
  },
};
