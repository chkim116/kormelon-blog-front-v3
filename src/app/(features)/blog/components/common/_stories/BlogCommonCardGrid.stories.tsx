import { ComponentProps } from 'react';
import { ArgTypes, Meta, StoryFn, StoryObj } from '@storybook/react';
import { DEFAULT_IMAGE } from '@shared/constants';
import { BlogCommonCardGrid } from '../BlogCommonCardGrid';

interface StoryProps extends ComponentProps<typeof BlogCommonCardGrid> {}

type MyArgTypes = Partial<Record<keyof StoryProps, ArgTypes[string]>>;
const argTypes: MyArgTypes = {};

export default {
  title: 'features/blog/common/BlogCommonCardGrid',
  component: BlogCommonCardGrid,
  argTypes,
} as Meta;

const Template: StoryFn<StoryProps> = ({ ...props }) => (
  <div className="max-w-6xl">
    <BlogCommonCardGrid {...props} />
  </div>
);

const createPosts = (length: number) =>
  Array.from({ length }, (_, i) => ({
    id: i,
    thumbnail: DEFAULT_IMAGE,
    title:
      '자바스크립트(프론트엔드) 개발자가 알면 좋은 사이트 링크 모음이' +
      ' ' +
      i,
    createdAt: 'OCTOBER 3, 2022',
    preview:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum quibusdam nulla culpa tempore deserunt dolor aspernatur rerum labore inventore, excepturi laudantium laborum veritatis praesentium rem cum ipsum',
    readTime: '5 minute read',
  }));

export const Default: StoryObj<StoryProps> = {
  render: Template,

  args: {
    posts: createPosts(6),
    loading: false,
  },
};

export const CustomTitle: StoryObj<StoryProps> = {
  render: Template,

  args: {
    ...Default.args,
    title: 'Development Post',
  },
};

export const ManyPosts: StoryObj<StoryProps> = {
  render: Template,

  args: {
    ...Default.args,
    posts: createPosts(12),
  },
};

export const Loading: StoryObj<StoryProps> = {
  render: Template,

  args: {
    ...Default.args,
    loading: true,
  },
};
