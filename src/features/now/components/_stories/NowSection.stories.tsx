import { ComponentProps } from 'react';
import { ArgTypes, Meta, StoryFn, StoryObj } from '@storybook/react';
import NowSection from '../NowSection';

interface StoryProps extends ComponentProps<typeof NowSection> {}

type MyArgTypes = Partial<Record<keyof StoryProps, ArgTypes[string]>>;
const argTypes: MyArgTypes = {};

export default {
  title: 'features/now/NowSection',
  component: NowSection,
  argTypes,
} as Meta<typeof NowSection>;

const Template: StoryFn<StoryProps> = ({ ...props }) => (
  <NowSection {...props} />
);

export const Default: StoryObj<StoryProps> = {
  render: Template,

  args: {},
};
