import { ComponentProps } from 'react';
import { ComponentStory, ComponentMeta, ArgTypes } from '@storybook/react';
import { BlogPostCardListByCategory } from '../BlogPostCardListByCategory';

type MyArgTypes = Partial<
  Record<
    keyof ComponentProps<typeof BlogPostCardListByCategory>,
    ArgTypes[string]
  >
>;
const argTypes: MyArgTypes = {};

export default {
  title: 'blog/search/BlogPostCardListByCategory',
  component: BlogPostCardListByCategory,
  argTypes,
} as ComponentMeta<typeof BlogPostCardListByCategory>;

const POST = {
  id: 1,
  thumbnail:
    'https://assets-kormelon-v2.s3.ap-northeast-2.amazonaws.com/winter2.jpg',
  title: '자바스크립트(프론트엔드) 개발자가 알면 좋은 사이트 링크 모음이',
  createdAt: 'OCTOBER 3, 2022',
  preview: '미리보기 내용',
  readTime: '5 minute read',
};

const Template: ComponentStory<typeof BlogPostCardListByCategory> = ({
  ...props
}) => <BlogPostCardListByCategory {...props} />;

export const Default = Template.bind({});
Default.args = {
  openId: 1,
  subCategories: [
    {
      id: 1,
      value: 'Javascript',
      categoryId: 1,
    },
  ],
  posts: [
    { ...POST },
    { ...POST, id: 2 },
    { ...POST, id: 3 },
    { ...POST, id: 4 },
  ],
};

export const Loading = Template.bind({});
Loading.args = {
  ...Default.args,
  loading: true,
};
