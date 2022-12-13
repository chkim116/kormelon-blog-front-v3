import { Divider } from '@mui/material';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { env } from '@common/env';
import { BlogPostNearEntity } from '@core/entities';
import { useQueryParser } from '@shared/hooks/useQueryParser';
import {
  BlogPostCommentContainer,
  BlogPostDetailContainer,
  BlogPostNearContainer,
} from '../containers/detail';
import { BlogPostDetailCommentParamsCtxProvider } from '../contexts';
import { refineBlogPostDetailCommentParams } from '../manipulates';
import { BlogPostDetailModel } from '../models';

const BlogPostDetailSkeleton = dynamic(() =>
  import('../components/detail/PostDetailSkeleton').then(
    ({ PostDetailSkeleton }) => PostDetailSkeleton,
  ),
);

interface BlogPostDetailPageProps {
  post: BlogPostDetailModel;
  postNear: BlogPostNearEntity;
}

export const BlogPostDetailPage = ({
  post,
  postNear,
}: BlogPostDetailPageProps) => {
  const router = useRouter();
  const queries = useQueryParser(refineBlogPostDetailCommentParams);

  if (router.isFallback) {
    if (env.isSSR) {
      return <></>;
    }

    return <BlogPostDetailSkeleton />;
  }

  return (
    <BlogPostDetailCommentParamsCtxProvider value={queries}>
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
    </BlogPostDetailCommentParamsCtxProvider>
  );
};
