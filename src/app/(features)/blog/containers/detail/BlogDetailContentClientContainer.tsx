'use client';
import { useEffect, useState } from 'react';
import copy from 'copy-to-clipboard';
import { STORAGE_LIKE_KEY, tokenProvider } from '@core/storage';
import { BlogPostDetailModel } from '@domain/uiStates';
import { Markdown } from '@shared/components/common';
import { toast } from '@shared/services';
import { useQueryPush } from '@shared/hooks';
import { useAppDispatch, useAppSelector } from '@shared/stores';
import { selUserData } from '@shared/stores/auth';
import {
  effBlogPostAddView,
  effBlogPostDelete,
  effBlogPostLike,
} from '@app/blog/stores';
import {
  BlogDetailContentAction,
  BlogDetailContentHeader,
  BlogDetailContentLayout,
} from '@app/blog/components/detail';
import { BlogDetailContentNavigationClientContainer } from './BlogDetailContentNavigationContainer';

interface BlogDetailContentClientContainerProps {
  post: BlogPostDetailModel;
}

export const BlogDetailContentClientContainer = ({
  post,
}: BlogDetailContentClientContainerProps) => {
  const dispatch = useAppDispatch();
  const router = useQueryPush();

  const { id: userId } = useAppSelector(selUserData);
  const isAuthor = post.user.id === userId;

  const [isLiked, setIsLiked] = useState(false);

  const handleShare = () => {
    try {
      copy(window.location.href);
      toast.open('success', 'Copied!');
    } catch (err) {
      toast.open('error', '다시 시도해 주세요.');
    }
  };

  const handleLike = () => {
    setIsLiked((prev) => !prev);
    dispatch(effBlogPostLike(post.id))
      .unwrap()
      .catch((err) => toast.open('error', err.message));
  };

  const handleDelete = (id: number) => {
    if (window.confirm('삭제하십니까?')) {
      dispatch(effBlogPostDelete(id))
        .unwrap()
        .then(() => {
          router({
            categoryId: post.category.id,
            subCategoryId: post.category.subCategoryId,
          });
        });
    }
  };

  useEffect(() => {
    // TODO storage 관리 외부로 위임
    setIsLiked(
      !!tokenProvider.get<number[]>(STORAGE_LIKE_KEY)?.includes(post.id),
    );
  }, [post.id]);

  useEffect(() => {
    dispatch(effBlogPostAddView(post.id));
  }, [dispatch, post.id]);

  return (
    <>
      <BlogDetailContentHeader
        {...post}
        isAuthor={isAuthor}
        onDelete={handleDelete}
      />

      <BlogDetailContentLayout
        navComponent={
          <BlogDetailContentNavigationClientContainer
            actionContents={
              <BlogDetailContentAction
                isLiked={isLiked}
                onLike={handleLike}
                onShare={handleShare}
              />
            }
          />
        }
        contentComponent={
          <>
            <Markdown content={post.content} />
            <BlogDetailContentAction
              isLiked={isLiked}
              onLike={handleLike}
              onShare={handleShare}
            />
          </>
        }
      />
    </>
  );
};
