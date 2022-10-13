import { ComponentProps } from 'react';
import { ComponentStory, ComponentMeta, ArgTypes } from '@storybook/react';
import { PostFloating } from '../PostFloating';

type MyArgTypes = Partial<
  Record<keyof ComponentProps<typeof PostFloating>, ArgTypes[string]>
>;
const argTypes: MyArgTypes = {};

export default {
  title: 'posts/detail/PostFloating',
  component: PostFloating,
  argTypes,
} as ComponentMeta<typeof PostFloating>;

const Template: ComponentStory<typeof PostFloating> = ({ ...props }) => (
  <div
    style={{
      position: 'relative',
      width: '280px',
      height: '500px',
    }}
  >
    <div>최소 1440px 이상일 시 렌더링됨.</div>
    <PostFloating {...props} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  anchors: ['1. variant', '2. state', '3. effect'],
};

export const Liked = Template.bind({});
Liked.args = {
  ...Default.args,
  isLiked: true,
};

export const Select = Template.bind({});
Select.args = {
  ...Default.args,
  activeAnchorId: '2. state',
};
