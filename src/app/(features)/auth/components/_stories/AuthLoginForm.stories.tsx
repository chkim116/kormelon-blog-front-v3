import { ComponentProps } from 'react';
import { StoryFn, Meta, ArgTypes } from '@storybook/react';
import { Button } from '@nextui-org/react';
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
    <AuthLoginForm {...props}>
      <Button
        className="w-full"
        type="submit"
        color="primary"
        data-cy="signInButton"
      >
        Sign In
      </Button>
    </AuthLoginForm>
  </div>
);

export const Default = {
  render: Template,

  args: {},
};
