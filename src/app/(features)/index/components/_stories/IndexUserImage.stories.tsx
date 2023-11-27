import { ComponentProps } from 'react';
import { ArgTypes, Meta, StoryFn, StoryObj } from '@storybook/react';
import { IndexUserImage } from '../IndexUserImage';

interface StoryProps extends ComponentProps<typeof IndexUserImage> {}

type MyArgTypes = Partial<Record<keyof StoryProps, ArgTypes[string]>>;
const argTypes: MyArgTypes = {};

export default {
  title: 'features/index/IndexUserImage',
  component: IndexUserImage,
  argTypes,
} as Meta;

const Template: StoryFn<StoryProps> = ({ ...props }) => (
  <IndexUserImage {...props} />
);

export const Default: StoryObj<StoryProps> = {
  render: Template,

  args: {},
};
