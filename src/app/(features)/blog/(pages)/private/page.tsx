'use client';
import { useCallback, useEffect } from 'react';
import { useAppDispatch } from '@shared/stores';
import { toast } from '@shared/services';
import { BlogPrivatePostContainer } from '../../containers/private';
import { effBlogPrivatePostsLoad } from '../../stores';

export default function BlogPrivatePostPage() {
  const dispatch = useAppDispatch();

  const loadPrivatePosts = useCallback(() => {
    dispatch(effBlogPrivatePostsLoad())
      .unwrap()
      .catch((err) => toast.open('error', err.message));
  }, [dispatch]);

  useEffect(loadPrivatePosts, [loadPrivatePosts]);

  return <BlogPrivatePostContainer />;
}
