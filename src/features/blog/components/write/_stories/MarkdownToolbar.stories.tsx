import { ComponentProps } from 'react';
import { ArgTypes, Meta, StoryFn, StoryObj } from '@storybook/react';
import MarkdownToolbar from '../MarkdownToolbar';

interface StoryProps extends ComponentProps<typeof MarkdownToolbar> {}

type MyArgTypes = Partial<Record<keyof StoryProps, ArgTypes[string]>>;
const argTypes: MyArgTypes = {};

export default {
  title: 'common/MarkdownToolbar',
  component: MarkdownToolbar,
  argTypes,
} as Meta;

const Template: StoryFn<StoryProps> = ({ ...props }) => {
  return <MarkdownToolbar {...props} />;
};

export const Default: StoryObj<StoryProps> = {
  render: Template,

  args: {},
};
