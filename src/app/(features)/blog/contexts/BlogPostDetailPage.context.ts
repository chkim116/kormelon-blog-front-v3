import { createContext, useContext } from 'react';

const BlogPostDetailCommentParamsContext = createContext({
  postId: 0,
  notificationId: '',
});

export const BlogPostDetailCommentParamsCtxProvider =
  BlogPostDetailCommentParamsContext.Provider;

export function useBlogPostDetailCommentParamsCtx() {
  const value = useContext(BlogPostDetailCommentParamsContext);

  return value;
}
