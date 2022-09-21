import { ComponentProps } from 'react';
import { ComponentStory, ComponentMeta, ArgTypes } from '@storybook/react';
import { Main } from '../Main';

type MyArgTypes = Partial<
  Record<keyof ComponentProps<typeof Main>, ArgTypes[string]>
>;
const argTypes: MyArgTypes = {};

export default {
  title: 'common/layout/Main',
  component: Main,
  argTypes,
} as ComponentMeta<typeof Main>;

const Template: ComponentStory<typeof Main> = ({ ...props }) => (
  <Main {...props} />
);

export const Default = Template.bind({});
Default.args = {};
