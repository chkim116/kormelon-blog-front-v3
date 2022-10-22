import { ComponentProps } from 'react';
import { ComponentStory, ComponentMeta, ArgTypes } from '@storybook/react';
import { SAMPLE_IMAGE } from '@common/constants';
import { PostDetailHeader } from '../PostDetailHeader';

type MyArgTypes = Partial<
  Record<keyof ComponentProps<typeof PostDetailHeader>, ArgTypes[string]>
>;
const argTypes: MyArgTypes = {};

export default {
  title: 'posts/detail/PostDetailHeader',
  component: PostDetailHeader,
  argTypes,
} as ComponentMeta<typeof PostDetailHeader>;

const Template: ComponentStory<typeof PostDetailHeader> = ({ ...props }) => (
  <PostDetailHeader {...props} />
);

export const Default = Template.bind({});
Default.args = {
  title: '자바스크립트 A to Z',
  user: {
    id: 'Asd',
    profileImage: SAMPLE_IMAGE,
    username: 'winter',
  },
  category: {
    id: 1,
    value: 'category',
    subCategoryId: 2,
    subCategoryValue: 'subCategory',
  },
  preview: '자바스크립트에 대해 알아본다.',
  createdAt: 'SEPTEMBER 21, 2022',
  readTime: '3 minute read',
  tags: [
    {
      id: 1,
      value: '태그1',
    },
  ],
};
