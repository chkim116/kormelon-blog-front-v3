import { ComponentProps, useState } from 'react';
import { ComponentStory, ComponentMeta, ArgTypes } from '@storybook/react';
import { PostPagination } from '../PostPagination';

type MyArgTypes = Partial<
  Record<keyof ComponentProps<typeof PostPagination>, ArgTypes[string]>
>;
const argTypes: MyArgTypes = {};

export default {
  title: 'blog/search/PostPagination',
  component: PostPagination,
  argTypes,
} as ComponentMeta<typeof PostPagination>;

const Template: ComponentStory<typeof PostPagination> = ({ ...props }) => {
  const [page, setPage] = useState(1);

  const handleChange = (page: number) => {
    setPage(page);
  };

  return <PostPagination {...props} page={page} onChange={handleChange} />;
};

export const Default = Template.bind({});
Default.args = {
  count: 10,
};

export const Empty = Template.bind({});
Empty.args = {
  count: 0,
};

export const Count100 = Template.bind({});
Count100.args = {
  count: 100,
};
