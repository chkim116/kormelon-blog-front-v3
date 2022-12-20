import { ComponentProps } from 'react';
import { ComponentStory, ComponentMeta, ArgTypes } from '@storybook/react';
import { SAMPLE_IMAGE } from '@common/constants';
import { toBlogPrivatePostModels } from '@features/blog/manipulates';
import { BlogPrivatePost } from '../BlogPrivatePost';

type MyArgTypes = Partial<
  Record<keyof ComponentProps<typeof BlogPrivatePost>, ArgTypes[string]>
>;
const argTypes: MyArgTypes = {};

export default {
  title: 'blog/private/BlogPrivatePost',
  component: BlogPrivatePost,
  argTypes,
} as ComponentMeta<typeof BlogPrivatePost>;

const Template: ComponentStory<typeof BlogPrivatePost> = ({ ...props }) => (
  <BlogPrivatePost {...props} />
);

const getPrivatePostMockUpList = (length: number) =>
  toBlogPrivatePostModels(
    Array.from({ length }, (_, i) => ({
      createdAt: '2022-12-20T12:49:02.074Z',
      id: i,
      thumbnail: SAMPLE_IMAGE,
      title: '멋진 신세계',
      preview: '글쓰기 바이블 유돈노 JS',
      readTime: 0,
      isPrivate: true,
    })),
  );

export const Default = Template.bind({});
Default.args = {
  privatePosts: getPrivatePostMockUpList(3),
};

export const ManyPosts = Template.bind({});
ManyPosts.args = {
  privatePosts: getPrivatePostMockUpList(30),
};

export const Loading = Template.bind({});
Loading.args = {
  loading: true,
};
