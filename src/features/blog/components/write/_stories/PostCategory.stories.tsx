import { ComponentProps, useState } from 'react';
import { ComponentStory, ComponentMeta, ArgTypes } from '@storybook/react';
import { PostCategory } from '../PostCategory';

type MyArgTypes = Partial<
  Record<keyof ComponentProps<typeof PostCategory>, ArgTypes[string]>
>;
const argTypes: MyArgTypes = {};

export default {
  title: 'blog/write/PostCategory',
  component: PostCategory,
  argTypes,
} as ComponentMeta<typeof PostCategory>;

const Template: ComponentStory<typeof PostCategory> = ({ ...props }) => {
  const [categoryId, setCategoryId] = useState(0);
  const [subCategoryId, setSubCategoryId] = useState(0);

  const handleChange = (name: string, id: number) => {
    props.onChangeCategory(name, id);

    if (name === 'categoryId') {
      return setCategoryId(id);
    }
    setSubCategoryId(id);
  };

  return (
    <PostCategory
      {...props}
      onChangeCategory={handleChange}
      categoryId={categoryId}
      subCategoryId={subCategoryId}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  categories: [
    {
      id: 1,
      value: '카테고리',
      subCategories: [
        {
          id: 1,
          value: '하위',
          categoryId: 1,
        },
      ],
    },
    {
      id: 2,
      value: '카테고리2',
      subCategories: [
        {
          id: 2,
          value: '하위2',
          categoryId: 2,
        },
        {
          id: 3,
          value: '하위3',
          categoryId: 2,
        },
      ],
    },
  ],
};

export const DefaultValue = Template.bind({});
DefaultValue.args = {
  ...Default.args,
  categoryId: 1,
  subCategoryId: 1,
};
