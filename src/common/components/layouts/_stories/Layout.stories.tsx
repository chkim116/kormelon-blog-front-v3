import { ComponentProps } from 'react';
import { ComponentStory, ComponentMeta, ArgTypes } from '@storybook/react';
import { Layout } from '../Layout';

type MyArgTypes = Partial<
  Record<keyof ComponentProps<typeof Layout>, ArgTypes[string]>
>;
const argTypes: MyArgTypes = {};

export default {
  title: 'common/layouts/Layout',
  component: Layout,
  argTypes,
} as ComponentMeta<typeof Layout>;

const Template: ComponentStory<typeof Layout> = ({ ...props }) => (
  <Layout {...props} />
);

export const Default = Template.bind({});
Default.args = {
  children: <div>페이지의 컴포넌트</div>,
};
