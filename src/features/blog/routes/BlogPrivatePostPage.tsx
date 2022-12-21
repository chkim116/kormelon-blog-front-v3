import { useCallback, useEffect } from 'react';
import { useAppDispatch } from '@common/store';
import { feedbackService } from '@common/components';
import { BlogPrivatePostContainer } from '../containers/private';
import { effBlogPrivatePostsLoad } from '../stores';

export const BlogPrivatePostPage = () => {
  const dispatch = useAppDispatch();

  const loadPrivatePosts = useCallback(() => {
    dispatch(effBlogPrivatePostsLoad())
      .unwrap()
      .catch((err) => feedbackService('error', err.message));
  }, [dispatch]);

  useEffect(loadPrivatePosts, [loadPrivatePosts]);

  return <BlogPrivatePostContainer />;
};
