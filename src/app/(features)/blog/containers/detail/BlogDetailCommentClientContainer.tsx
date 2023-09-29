'use client';
import { useCallback, useEffect, useRef } from 'react';
import { useAppDispatch } from '@shared/stores';
import { effNotificationRead } from '@shared/stores/notification';
import { intersectionObserver } from '@shared/utils';
import { refineBlogPostDetailCommentParams } from '@domain/manipulates/blogDetail.convert';
import { useQueryParser } from '@shared/hooks';
import { effBlogPostCommentsLoad } from '@app/blog/stores';
import { BlogDetailCommentLayout } from '@app/blog/components/detail';
import { BlogPostDetailCommentParamsCtxProvider } from '@app/blog/contexts';
import { BlogDetailCommentTextareaContainer } from './BlogDetailCommentTextareaContainer';
import { BlogDetailCommentBodyContainerClient } from './BlogDetailCommentBodyContainer.client';

/**
 * TODO: parallel routers로
 */
export const BlogDetailCommentClientContainer = () => {
  const dispatch = useAppDispatch();

  const params = useQueryParser(refineBlogPostDetailCommentParams);
  const { postId, notificationId } = params;

  const refCommentElement = useRef<HTMLDivElement>(null);

  const handleNotificationRead = useCallback(() => {
    if (notificationId) {
      dispatch(effNotificationRead(Number(notificationId))).unwrap();
    }
  }, [dispatch, notificationId]);

  const handleCommentLoad = useCallback(() => {
    intersectionObserver(refCommentElement.current, { threshold: 0.1 }, () => {
      dispatch(effBlogPostCommentsLoad(postId)).unwrap();
    });
  }, [dispatch, postId]);

  useEffect(handleNotificationRead, [handleNotificationRead]);
  useEffect(handleCommentLoad, [handleCommentLoad]);

  return (
    <BlogDetailCommentLayout ref={refCommentElement}>
      <BlogPostDetailCommentParamsCtxProvider value={params}>
        <BlogDetailCommentTextareaContainer />
        <BlogDetailCommentBodyContainerClient />
      </BlogPostDetailCommentParamsCtxProvider>
    </BlogDetailCommentLayout>
  );
};
