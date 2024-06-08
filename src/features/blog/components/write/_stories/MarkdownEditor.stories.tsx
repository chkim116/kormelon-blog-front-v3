import { ComponentProps, useRef, useState } from 'react';
import { ArgTypes, Meta, StoryFn, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import MarkdownEditor, { MarkdownEditorHandle } from '../MarkdownEditor';
import MarkdownToolbar, { MarkdownToolbarClickArgs } from '../MarkdownToolbar';
import MarkdownViewer from '../MarkdownViewer';

interface StoryProps extends ComponentProps<typeof MarkdownEditor> {}

type MyArgTypes = Partial<Record<keyof StoryProps, ArgTypes[string]>>;
const argTypes: MyArgTypes = {};

export default {
  title: 'common/MarkdownEditor',
  component: MarkdownEditor,
  argTypes,
} as Meta;

const handler = action('onTestToolbarClick');

const Template: StoryFn<StoryProps> = ({ ...props }) => {
  const ref = useRef<MarkdownEditorHandle>(null);
  const [value, setValue] = useState(props.initialValue);

  const handleDrop = (fd: FormData) => {
    props.onDrop(fd);

    ref.current?.setImage('https://picsum.photos/200/300');
  };

  const handleChange = (value: string) => {
    props.onChange(value);
    setValue(value);
  };

  const handleToolbarClick = (args: MarkdownToolbarClickArgs) => {
    handler(args);
    ref.current?.insert(args);
  };

  return (
    <>
      <div>value: {value}</div>
      <MarkdownToolbar onToolbarClick={handleToolbarClick} />
      <MarkdownEditor
        {...props}
        onDrop={handleDrop}
        ref={ref}
        onChange={handleChange}
      />
      <MarkdownViewer content={value} />
    </>
  );
};

export const Default: StoryObj<StoryProps> = {
  render: Template,

  args: {},
};

export const InitialValue: StoryObj<StoryProps> = {
  render: Template,

  args: {
    initialValue: 'Markdown Editor\n```ts\nconst a : number = 123;\n```',
  },
};
