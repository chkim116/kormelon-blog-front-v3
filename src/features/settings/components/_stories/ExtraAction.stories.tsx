import { ComponentProps } from 'react';
import { ComponentStory, ComponentMeta, ArgTypes } from '@storybook/react';
import { ExtraAction } from '../ExtraAction';

type MyArgTypes = Partial<
  Record<keyof ComponentProps<typeof ExtraAction>, ArgTypes[string]>
>;
const argTypes: MyArgTypes = {};

export default {
  title: 'settings/category/ExtraAction',
  component: ExtraAction,
  argTypes,
} as ComponentMeta<typeof ExtraAction>;

const Template: ComponentStory<typeof ExtraAction> = ({ ...props }) => (
  <ExtraAction {...props} />
);

export const Default = Template.bind({});
Default.args = {
  isEditMode: false,
};

export const Edit = Template.bind({});
Edit.args = {
  isEditMode: true,
};
