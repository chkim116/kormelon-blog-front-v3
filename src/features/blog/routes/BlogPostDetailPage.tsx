import { Divider } from '@mui/material';
import { BlogPostNearEntity } from '@core/entities';
import { useQueryParser } from '@shared/hooks/useQueryParser';
import { PageSeo } from '@common/head';
import {
  BlogPostCommentContainer,
  BlogPostDetailContainer,
  BlogPostNearContainer,
  BlogPostRecommendContainer,
} from '../containers/detail';
import { BlogPostDetailCommentParamsCtxProvider } from '../contexts';
import { refineBlogPostDetailCommentParams } from '../manipulates';
import { BlogPostDetailModel } from '../models';

interface BlogPostDetailPageProps {
  post: BlogPostDetailModel;
  postNear: BlogPostNearEntity;
}

export const BlogPostDetailPage = ({
  post,
  postNear,
}: BlogPostDetailPageProps) => {
  const queries = useQueryParser(refineBlogPostDetailCommentParams);

  return (
    <BlogPostDetailCommentParamsCtxProvider value={queries}>
      <PageSeo
        url={`https://www.kormelon.com/blog/${post.id}`}
        image={post.thumbnail}
        desc={post.preview}
        title={post.title}
      />
      <BlogPostDetailContainer post={post} />
      <Divider
        sx={{
          maxWidth: 'md',
          mx: 'auto',
          my: 8,
        }}
      />
      <BlogPostCommentContainer />
      <BlogPostNearContainer postNear={postNear} />
      <BlogPostRecommendContainer />
    </BlogPostDetailCommentParamsCtxProvider>
  );
};
