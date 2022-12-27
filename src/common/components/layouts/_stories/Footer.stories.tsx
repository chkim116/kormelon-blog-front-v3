import { ComponentProps } from 'react';
import { ComponentStory, ComponentMeta, ArgTypes } from '@storybook/react';
import { Footer } from '../Footer';

type MyArgTypes = Partial<
  Record<keyof ComponentProps<typeof Footer>, ArgTypes[string]>
>;
const argTypes: MyArgTypes = {};

export default {
  title: 'common/layouts/Footer',
  component: Footer,
  argTypes,
} as ComponentMeta<typeof Footer>;

const Template: ComponentStory<typeof Footer> = ({ ...props }) => (
  <Footer {...props} />
);

export const Default = Template.bind({});
Default.args = {
  today: Number(0).toLocaleString(),
  total: Number(0).toLocaleString(),
};

export const View = Template.bind({});
View.args = {
  today: Number(100).toLocaleString(),
  total: Number(1000).toLocaleString(),
};
