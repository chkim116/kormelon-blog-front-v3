import { ComponentProps } from 'react';
import { ComponentStory, ComponentMeta, ArgTypes } from '@storybook/react';
import { SAMPLE_IMAGE } from '@common/constants';
import { BlogPostRecommendPost } from '../BlogPostRecommendPost';

type MyArgTypes = Partial<
  Record<keyof ComponentProps<typeof BlogPostRecommendPost>, ArgTypes[string]>
>;
const argTypes: MyArgTypes = {};

export default {
  title: 'blog/detail/BlogPostRecommendPost',
  component: BlogPostRecommendPost,
  argTypes,
} as ComponentMeta<typeof BlogPostRecommendPost>;

const Template: ComponentStory<typeof BlogPostRecommendPost> = ({
  ...props
}) => <BlogPostRecommendPost {...props} />;

const POSTS = Array.from({ length: 4 }, (_, i) => ({
  id: i,
  preview:
    'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa architecto nostrum, facere tempore officia qui sed laborum unde ea? Similique molestias ipsum deleniti velit numquam minima praesentium ipsam excepturi in!',
  createdAt: '2022-12-22',
  thumbnail: SAMPLE_IMAGE,
  readTime: '3 min read',
  title: 'dd',
}));

export const Default = Template.bind({});
Default.args = {
  posts: POSTS,
};
