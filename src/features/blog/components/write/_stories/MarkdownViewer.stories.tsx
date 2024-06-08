import { ComponentProps } from 'react';
import { ArgTypes, Meta, StoryFn, StoryObj } from '@storybook/react';
import MarkdownViewer from '../MarkdownViewer';

interface StoryProps extends ComponentProps<typeof MarkdownViewer> {}

type MyArgTypes = Partial<Record<keyof StoryProps, ArgTypes[string]>>;
const argTypes: MyArgTypes = {};

export default {
  title: 'common/MarkdownViewer',
  component: MarkdownViewer,
  argTypes,
} as Meta;

const Template: StoryFn<StoryProps> = ({ ...props }) => {
  return <MarkdownViewer {...props} />;
};

export const Default: StoryObj<StoryProps> = {
  render: Template,

  args: {
    content: 'Markdown Editor\n```ts\nconst a : number = 123;\n```',
  },
};
