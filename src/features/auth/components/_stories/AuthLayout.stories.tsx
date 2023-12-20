import { ComponentProps } from 'react';
import { ArgTypes, Meta, StoryFn, StoryObj } from '@storybook/react';
import { Button } from '@nextui-org/react';
import { action } from '@storybook/addon-actions';
import AuthLayout from '../AuthLayout';
import AuthLoginForm from '../AuthLoginForm';

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
    children: (
      <AuthLoginForm onSubmit={action('onSubmit')}>
        <Button>확인</Button>
      </AuthLoginForm>
    ),
  },
};
