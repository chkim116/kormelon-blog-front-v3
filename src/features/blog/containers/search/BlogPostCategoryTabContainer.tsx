import { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import { DEFAULT_PAGE } from '@common/constants';
import { useAppSelector } from '@common/store';
import { CategoryEntity, SubCategoryEntity } from '@core/entities';
import { useQueryPush } from '@shared/hooks/useQueryPush';
import { selCategories } from '@shared/stores/category';
import { BlogPostSubCategoryTabContainer } from '@features/blog/containers/search/BlogPostSubCategoryTabContainer';
import {
  selBlogPostLoading,
  selBlogPosts,
  selBlogPostSearchParams,
} from '@features/blog/stores';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BlogPostCategoryTabContainerProps {}

export type SubCategoryModel = Omit<SubCategoryEntity, 'posts'>;

export const BlogPostCategoryTabContainer = (
  _: BlogPostCategoryTabContainerProps,
) => {
  const posts = useAppSelector(selBlogPosts);
  const loadedCategories = useAppSelector(selCategories);
  const loading = useAppSelector(selBlogPostLoading);
  const {
    page = DEFAULT_PAGE,
    categoryId = 0,
    subCategoryId = 0,
  } = useAppSelector(selBlogPostSearchParams);

  const navigate = useQueryPush();

  const [categories, setCategories] =
    useState<CategoryEntity[]>(loadedCategories);
  const [subCategories, setSubCategories] = useState<SubCategoryModel[]>([]);

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

    const queries = {
      categoryId: value,
      subCategoryId: String(subCategoryId || ''),
      page: String(DEFAULT_PAGE),
    };

    setSubCategories(subCategories);
    navigate(queries, false);
  };

  const handleMove = (subCategoryId: number) => {
    const queries = {
      subCategoryId: String(subCategoryId || ''),
      page: String(DEFAULT_PAGE),
    };

    navigate(queries, false);
  };

  useEffect(() => {
    const { subCategories } = findSubCategoriesByCategoryId(categoryId);

    setSubCategories(subCategories);
  }, [categoryId, findSubCategoriesByCategoryId]);

  useEffect(() => {
    setCategories([
      { id: 0, value: 'All', subCategories: [] },
      ...loadedCategories,
    ]);
  }, [loadedCategories]);

  return (
    <Box minHeight="200px" component="section">
      <TabContext value={String(categoryId)}>
        <TabList
          aria-label="scrollable force tabs"
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

        <Box mt={4} minHeight="80vh">
          {categories.map((category) => (
            <TabPanel
              value={category.id.toString()}
              key={category.id}
              sx={{
                p: 0,
              }}
            >
              <BlogPostSubCategoryTabContainer
                loading={loading}
                page={page}
                openId={subCategoryId}
                subCategories={subCategories}
                posts={posts}
                onMove={handleMove}
              />
            </TabPanel>
          ))}
        </Box>
      </TabContext>
    </Box>
  );
};
