import { ComponentProps } from 'react';
import { ArgTypes, Meta, StoryFn, StoryObj } from '@storybook/react';
import { CommonError } from '../CommonError';

interface StoryProps extends ComponentProps<typeof CommonError> {}

type MyArgTypes = Partial<Record<keyof StoryProps, ArgTypes[string]>>;
const argTypes: MyArgTypes = {};

export default {
  title: 'shared/error/CommonError',
  component: CommonError,
  argTypes,
} as Meta;

const Template: StoryFn<StoryProps> = ({ ...props }) => (
  <CommonError {...props} />
);

export const Default: StoryObj<StoryProps> = {
  render: Template,

  args: {
    text: '검색 결과가 없습니다 :(',
  },
};
