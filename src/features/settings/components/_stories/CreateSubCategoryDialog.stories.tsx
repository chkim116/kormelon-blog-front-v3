import { ComponentProps } from 'react';
import { ComponentStory, ComponentMeta, ArgTypes } from '@storybook/react';
import { CreateSubCategoryDialog } from '../CreateSubCategoryDialog';

type MyArgTypes = Partial<
  Record<keyof ComponentProps<typeof CreateSubCategoryDialog>, ArgTypes[string]>
>;
const argTypes: MyArgTypes = {};

export default {
  title: 'settings/category/CreateSubCategoryDialog',
  component: CreateSubCategoryDialog,
  argTypes,
} as ComponentMeta<typeof CreateSubCategoryDialog>;

const Template: ComponentStory<typeof CreateSubCategoryDialog> = ({
  ...props
}) => <CreateSubCategoryDialog {...props} />;

export const Default = Template.bind({});
Default.args = {
  isOpen: true,
};
