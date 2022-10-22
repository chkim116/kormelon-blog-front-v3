import { ComponentProps } from 'react';
import { ComponentStory, ComponentMeta, ArgTypes } from '@storybook/react';
import { SAMPLE_IMAGE } from '@common/constants';
import { PostNearCard } from '../PostNearCard';

type MyArgTypes = Partial<
  Record<keyof ComponentProps<typeof PostNearCard>, ArgTypes[string]>
>;
const argTypes: MyArgTypes = {};

export default {
  title: 'blog/detail/PostNearCard',
  component: PostNearCard,
  argTypes,
} as ComponentMeta<typeof PostNearCard>;

const Template: ComponentStory<typeof PostNearCard> = ({ ...props }) => (
  <PostNearCard {...props} />
);

export const Default = Template.bind({});
Default.args = {
  post: {
    id: 1,
    thumbnail: SAMPLE_IMAGE,
    title: '가자.',
    createdAt: 'October 24, 2022',
  },
};
