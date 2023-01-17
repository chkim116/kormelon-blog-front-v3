import { BlogPostNearEntity } from '@core/entities';
import { useQueryParser } from '@shared/hooks/useQueryParser';
import {
  BlogPostCommentContainer,
  BlogPostDetailContainer,
  BlogPostNearContainer,
  BlogPostRecommendContainer,
} from '../containers/detail';
import { BlogPostDetailCommentParamsCtxProvider } from '../contexts';
import { refineBlogPostDetailCommentParams } from '../manipulates';
import { BlogPostDetailModel } from '../models';

export interface BlogPostDetailPageProps {
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
      <BlogPostDetailContainer post={post} />
      <BlogPostCommentContainer />
      <BlogPostNearContainer postNear={postNear} />
      <BlogPostRecommendContainer />
    </BlogPostDetailCommentParamsCtxProvider>
  );
};
