import dynamic from 'next/dynamic';

export const BlogPostCommentContainer = dynamic(() =>
  import('./BlogPostCommentContainer').then(
    ({ BlogPostCommentContainer }) => BlogPostCommentContainer,
  ),
);

export const BlogPostNearContainer = dynamic(async () =>
  import('./BlogPostNearContainer').then(
    ({ BlogPostNearContainer }) => BlogPostNearContainer,
  ),
);

export const BlogPostRecommendContainer = dynamic(() =>
  import('./BlogPostRecommendContainer').then(
    ({ BlogPostRecommendContainer }) => BlogPostRecommendContainer,
  ),
);

export * from './BlogPostDetailContainer';
