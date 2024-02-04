import { ComponentProps, useEffect, useState } from 'react';
import { StoryFn, Meta, ArgTypes } from '@storybook/react';
import { categoryFixtures } from '@fixtures/category.fixtures';
import { BlogWriteCategory } from '../BlogWriteCategory';

type MyArgTypes = Partial<
  Record<keyof ComponentProps<typeof BlogWriteCategory>, ArgTypes[string]>
>;
const argTypes: MyArgTypes = {};

export default {
  title: 'features/blog/write/BlogWriteCategory',
  component: BlogWriteCategory,
  argTypes,
} as Meta<typeof BlogWriteCategory>;

const Template: StoryFn<typeof BlogWriteCategory> = ({ ...props }) => {
  const [categoryId, setCategoryId] = useState(props.categoryId);
  const [subCategoryId, setSubCategoryId] = useState(props.subCategoryId);

  const handleChange = (name: string, id: number) => {
    props.onChangeCategory(name, id);

    if (name === 'categoryId') {
      return setCategoryId(id);
    }
    setSubCategoryId(id);
  };

  useEffect(() => {
    setCategoryId(props.categoryId);
  }, [props.categoryId]);

  useEffect(() => {
    setSubCategoryId(props.subCategoryId);
  }, [props.subCategoryId]);

  return (
    <BlogWriteCategory
      {...props}
      onChangeCategory={handleChange}
      categoryId={categoryId}
      subCategoryId={subCategoryId}
    />
  );
};

const categories = categoryFixtures.getCategories();

export const Default = {
  render: Template,

  args: {
    categories,
  },
};

export const DefaultValue = {
  render: Template,

  args: {
    ...Default.args,
    categoryId: categories[0].id,
    subCategoryId: categories[0].subCategories[0].id,
  },
};
