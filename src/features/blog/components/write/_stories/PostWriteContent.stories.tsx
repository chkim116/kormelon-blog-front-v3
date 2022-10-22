import { ComponentProps } from 'react';
import { ComponentStory, ComponentMeta, ArgTypes } from '@storybook/react';
import { SAMPLE_IMAGE } from '@common/constants';
import { PostWriteContent } from '../PostWriteContent';

type MyArgTypes = Partial<
  Record<keyof ComponentProps<typeof PostWriteContent>, ArgTypes[string]>
>;
const argTypes: MyArgTypes = {};

export default {
  title: 'blog/write/PostWriteContent',
  component: PostWriteContent,
  argTypes,
} as ComponentMeta<typeof PostWriteContent>;

const Template: ComponentStory<typeof PostWriteContent> = ({ ...props }) => (
  <PostWriteContent {...props} />
);

export const Default = Template.bind({});
Default.args = {
  content: `# hello\n![image](${SAMPLE_IMAGE})\n\n> hi`,
};
