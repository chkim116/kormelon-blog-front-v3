import { ComponentProps } from 'react';
import { ComponentStory, ComponentMeta, ArgTypes } from '@storybook/react';
import { Header } from '../Header';

type MyArgTypes = Partial<
  Record<keyof ComponentProps<typeof Header>, ArgTypes[string]>
>;
const argTypes: MyArgTypes = {};

export default {
  title: 'common/layouts/Header',
  component: Header,
  argTypes,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = () => <Header />;

export const Default = Template.bind({});
Default.args = {};
