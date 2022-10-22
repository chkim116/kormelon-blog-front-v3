import { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import { CategoryEntity, SubCategoryEntity } from '@core/entities';
import { useQueryPush } from '@shared/hooks/useQueryPush';
import { useAppSelector } from '@common/store';
import { DEFAULT_PAGE } from '@common/constants';
import { PostCardListByCategory } from '@features/blog/components/search/PostCardListByCategory';
import { BlogPostModel } from '@features/blog/models/blog.model';
import {
  selBlogPostLoading,
  selBlogPostSearchParams,
} from '@features/blog/stores';

interface BlogPostCategoryContainerProps {
  categories: CategoryEntity[];
  posts: BlogPostModel[];
}

export const BlogPostCategoryContainer = ({
  categories: outCategories,
  posts,
}: BlogPostCategoryContainerProps) => {
  const navigate = useQueryPush();
  const loading = useAppSelector(selBlogPostLoading);
  const {
    page = DEFAULT_PAGE,
    categoryId = 0,
    subCategoryId = 0,
  } = useAppSelector(selBlogPostSearchParams);

  const [categories, setCategories] = useState<CategoryEntity[]>(outCategories);
  const [subCategories, setSubCategories] = useState<
    Omit<SubCategoryEntity, 'posts'>[]
  >([]);

  const findSubCategoriesByCategoryId = useCallback(
    (id: number) => {
      const findSubCategories =
        categories.find((category) => category.id === id)?.subCategories || [];
      const subCategoryId = findSubCategories[0]?.id || 0;
      return {
        subCategories: findSubCategories,
        subCategoryId: subCategoryId,
      };
    },
    [categories],
  );

  const handleTabChange = (_: SyntheticEvent, value: string) => {
    const { subCategoryId, subCategories } = findSubCategoriesByCategoryId(
      Number(value),
    );

    setSubCategories(subCategories);
    navigate(
      {
        categoryId: value,
        subCategoryId: String(subCategoryId || ''),
        page: String(DEFAULT_PAGE),
      },
      false,
    );
  };

  const handleMove = (subCategoryId: number) => {
    navigate(
      {
        subCategoryId: String(subCategoryId || ''),
        page: String(DEFAULT_PAGE),
      },
      false,
    );
  };

  useEffect(() => {
    const { subCategories } = findSubCategoriesByCategoryId(categoryId);

    setSubCategories(subCategories);
  }, [categoryId, findSubCategoriesByCategoryId]);

  useEffect(() => {
    setCategories([
      { id: 0, value: 'All', subCategories: [] },
      ...outCategories,
    ]);
  }, [outCategories]);

  return (
    <Box minHeight="200px" component="section">
      <TabContext value={String(categoryId)}>
        <TabList
          aria-label="scrollable force tabs example"
          variant="scrollable"
          onChange={handleTabChange}
        >
          {categories.map((category) => (
            <Tab
              key={category.id}
              label={category.value}
              value={category.id.toString()}
            />
          ))}
        </TabList>

        <Box mt={4}>
          {categories.map((category) => (
            <TabPanel
              value={category.id.toString()}
              key={category.id}
              sx={{
                p: 0,
              }}
            >
              <PostCardListByCategory
                page={page}
                loading={loading}
                posts={posts}
                openId={subCategoryId}
                subCategories={subCategories}
                onMove={handleMove}
              />
            </TabPanel>
          ))}
        </Box>
      </TabContext>
    </Box>
  );
};
