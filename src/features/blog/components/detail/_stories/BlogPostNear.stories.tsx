import { ComponentProps } from 'react';
import { ComponentStory, ComponentMeta, ArgTypes } from '@storybook/react';
import { SAMPLE_IMAGE } from '@common/constants';
import { BlogPostNear } from '../BlogPostNear';

type MyArgTypes = Partial<
  Record<keyof ComponentProps<typeof BlogPostNear>, ArgTypes[string]>
>;
const argTypes: MyArgTypes = {};

export default {
  title: 'blog/detail/BlogPostNear',
  component: BlogPostNear,
  argTypes,
} as ComponentMeta<typeof BlogPostNear>;

const Template: ComponentStory<typeof BlogPostNear> = ({ ...props }) => (
  <BlogPostNear {...props} />
);

export const Default = Template.bind({});
Default.args = {
  postNear: {
    next: {
      id: 1,
      title: '다음글',
      thumbnail: SAMPLE_IMAGE,
      createdAt: '2022-12-12',
    },
    prev: {
      id: 2,
      title: '이전글',
      thumbnail: SAMPLE_IMAGE,
      createdAt: '2022-12-12',
    },
  },
};

export const NextNull = Template.bind({});
NextNull.args = {
  postNear: {
    prev: {
      id: 1,
      title: '이전글',
      thumbnail: SAMPLE_IMAGE,
      createdAt: '2022-12-12',
    },
    next: null,
  },
};

export const PrevNull = Template.bind({});
PrevNull.args = {
  postNear: {
    next: {
      id: 1,
      title: '다음글',
      thumbnail: SAMPLE_IMAGE,
      createdAt: '2022-12-12',
    },
    prev: null,
  },
};

export const Null = Template.bind({});
Null.args = {
  postNear: {
    next: null,
    prev: null,
  },
};
