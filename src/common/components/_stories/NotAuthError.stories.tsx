import { ComponentProps } from 'react';
import { ArgTypes, Meta, StoryFn, StoryObj } from '@storybook/react';
import { NotAuthError } from '../NotAuthError';

interface StoryProps extends ComponentProps<typeof NotAuthError> {}

type MyArgTypes = Partial<Record<keyof StoryProps, ArgTypes[string]>>;
const argTypes: MyArgTypes = {};

export default {
  title: 'common/NotAuthError',
  component: NotAuthError,
  argTypes,
} as Meta;

const Template: StoryFn<StoryProps> = ({ ...props }) => (
  <NotAuthError {...props} />
);

export const Default: StoryObj<StoryProps> = {
  render: Template,

  args: {},
};
