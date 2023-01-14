import { SyntheticEvent, useMemo } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import { DEFAULT_PAGE } from '@common/constants';
import { SubCategoryModel } from '@features/blog/containers/search';
import { BlogPostModel } from '@features/blog/models/blog.model';
import { BlogPostList } from '../../components/search/BlogPostList';
import { CategoryChip } from '../../components/search/CategoryChip';

interface BlogPostSubCategoryTabContainerProps {
  page: number;
  openId: number;
  loading: boolean;
  subCategories: SubCategoryModel[];
  posts: BlogPostModel[];
  onMove: (id: number) => void;
}

export const BlogPostSubCategoryTabContainer = ({
  page,
  loading,
  onMove,
  openId,
  posts,
  subCategories,
}: BlogPostSubCategoryTabContainerProps) => {
  const { firstPost, restPost } = useMemo(() => {
    const [firstPost, ...restPost] = posts;

    return {
      firstPost: page === DEFAULT_PAGE ? firstPost : null,
      restPost: page === DEFAULT_PAGE ? restPost : posts,
    };
  }, [page, posts]);

  const handleTabChange = (_: SyntheticEvent, value: string) => {
    onMove(Number(value));
  };

  if (openId === 0) {
    return posts.length ? (
      <BlogPostList
        firstPost={firstPost}
        restPost={restPost}
        loading={loading}
      />
    ) : (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="60vh"
      >
        현재 게시된 글이 없습니다. :)
      </Box>
    );
  }

  return (
    <TabContext value={openId.toString()}>
      <TabList
        variant="scrollable"
        onChange={handleTabChange}
        sx={{
          '.MuiTabs-indicator': {
            backgroundColor: 'transparent',
          },
        }}
      >
        {subCategories.map((subCategory) => (
          <Tab
            key={subCategory.id}
            sx={{
              padding: '0 0.25em',
            }}
            value={subCategory.id.toString()}
            label={
              <CategoryChip
                id={subCategory.id}
                value={subCategory.value}
                selected={subCategory.id === openId}
              />
            }
          />
        ))}
      </TabList>

      {subCategories.map((subCategory) => (
        <TabPanel key={subCategory.id} value={subCategory.id.toString()}>
          {posts.length ? (
            <BlogPostList
              firstPost={firstPost}
              restPost={restPost}
              loading={loading}
            />
          ) : (
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              height="60vh"
            >
              현재 게시된 글이 없습니다. :)
            </Box>
          )}
        </TabPanel>
      ))}
    </TabContext>
  );
};
