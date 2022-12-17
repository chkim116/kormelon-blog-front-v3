import { ComponentProps } from 'react';
import { ComponentStory, ComponentMeta, ArgTypes } from '@storybook/react';
import { PostCard } from '../../../features/blog/components/search/PostCard';

type MyArgTypes = Partial<
  Record<keyof ComponentProps<typeof PostCard>, ArgTypes[string]>
>;
const argTypes: MyArgTypes = {};

export default {
  title: 'blog/search/PostCard',
  component: PostCard,
  argTypes,
} as ComponentMeta<typeof PostCard>;

const Template: ComponentStory<typeof PostCard> = ({ ...props }) => (
  <div style={{ maxWidth: '478px' }}>
    <PostCard {...props} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  id: 1,
  thumbnail:
    'https://assets-kormelon-v2.s3.ap-northeast-2.amazonaws.com/winter2.jpg',
  title: '자바스크립트(프론트엔드) 개발자가 알면 좋은 사이트 링크 모음이',
  createdAt: 'OCTOBER 3, 2022',
  preview: '미리보기 내용',
  readTime: '5 minute read',
};

export const Loading = Template.bind({});
Loading.args = {
  loading: true,
};
