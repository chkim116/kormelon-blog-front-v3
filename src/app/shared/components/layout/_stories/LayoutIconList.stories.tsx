import { ArgTypes, Meta, StoryFn, StoryObj } from '@storybook/react';
import { LayoutIconList } from '../LayoutIconList';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface StoryProps {}

type MyArgTypes = Partial<Record<keyof StoryProps, ArgTypes[string]>>;
const argTypes: MyArgTypes = {};

export default {
  title: 'shared/layout/LayoutIconList',
  component: LayoutIconList,
  argTypes,
} as Meta;

const Template: StoryFn<StoryProps> = ({ ...props }) => (
  <LayoutIconList {...props} />
);

export const Default: StoryObj<StoryProps> = {
  render: Template,

  args: {},
};
