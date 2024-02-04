import { ArgTypes, Meta, StoryFn, StoryObj } from '@storybook/react';
import { NavbarIconList } from '../NavbarIconList';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface StoryProps {}

type MyArgTypes = Partial<Record<keyof StoryProps, ArgTypes[string]>>;
const argTypes: MyArgTypes = {};

export default {
  title: 'shared/NavbarIconList',
  component: NavbarIconList,
  argTypes,
} as Meta;

const Template: StoryFn<StoryProps> = ({ ...props }) => (
  <NavbarIconList {...props} />
);

export const Default: StoryObj<StoryProps> = {
  render: Template,

  args: {},
};
