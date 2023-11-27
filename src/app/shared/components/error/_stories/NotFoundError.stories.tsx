import { ComponentProps } from 'react';
import { ArgTypes, Meta, StoryFn, StoryObj } from '@storybook/react';
import { NotFoundError } from '../NotFoundError';

interface StoryProps extends ComponentProps<typeof NotFoundError> {}

type MyArgTypes = Partial<Record<keyof StoryProps, ArgTypes[string]>>;
const argTypes: MyArgTypes = {};

export default {
  title: 'shared/error/NotFoundError',
  component: NotFoundError,
  argTypes,
} as Meta;

const Template: StoryFn<StoryProps> = ({ ...props }) => (
  <NotFoundError {...props} />
);

export const Default: StoryObj<StoryProps> = {
  render: Template,

  args: {},
};
