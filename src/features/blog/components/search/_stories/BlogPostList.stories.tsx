import { ComponentProps } from 'react';
import { ComponentStory, ComponentMeta, ArgTypes } from '@storybook/react';
import { BlogPostModel } from '@features/blog/models';
import { BlogPostList } from '../BlogPostList';

type MyArgTypes = Partial<
  Record<keyof ComponentProps<typeof BlogPostList>, ArgTypes[string]>
>;
const argTypes: MyArgTypes = {};

const POST: BlogPostModel = {
  id: 1,
  thumbnail:
    'https://assets-kormelon-v2.s3.ap-northeast-2.amazonaws.com/winter2.jpg',
  title: '자바스크립트(프론트엔드) 개발자가 알면 좋은 사이트 링크 모음이',
  createdAt: 'OCTOBER 3, 2022',
  preview: '미리보기 내용',
  readTime: '5 minute read',
};

export default {
  title: 'blog/search/BlogPostList',
  component: BlogPostList,
  argTypes,
} as ComponentMeta<typeof BlogPostList>;

const Template: ComponentStory<typeof BlogPostList> = ({ ...props }) => (
  <BlogPostList {...props} />
);

export const Default = Template.bind({});
Default.args = {
  firstPost: POST,
  restPost: [],
};

export const Rest = Template.bind({});
Rest.args = {
  ...Default.args,
  restPost: [
    { ...POST, id: 2 },
    { ...POST, id: 3 },
  ],
};

export const Loading = Template.bind({});
Loading.args = {
  ...Default.args,
  loading: true,
};
