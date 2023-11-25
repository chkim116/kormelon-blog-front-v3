'use client';
import { useEffect, useState } from 'react';
import copy from 'copy-to-clipboard';
import qs from 'qs';
import { redirect } from 'next/navigation';
import { blogDetailService } from '@domain/blog/detail';
import { BlogDetailUiState } from '@domain/blog/detail/blogDetail.uiState';
import { Markdown } from 'src/app/shared/components/common/Markdown';
import { useFormActionState } from 'src/app/shared/hooks/useFormActionState';
import { toast } from 'src/app/shared/services/ToastService';
import {
  actBlogDetailAddLike,
  actBlogDetailDeleteBlog,
} from '@app/blog/actions/blogDetail.action';
import { BlogDetailContentAction } from '@app/blog/components/detail/BlogDetailContentAction';
import { BlogDetailContentHeader } from '@app/blog/components/detail/BlogDetailContentHeader';
import { BlogDetailContentLayout } from '@app/blog/components/detail/BlogDetailContentLayout';
import { BlogDetailContentUserMeta } from '@app/blog/components/detail/BlogDetailContentUserMeta';
import { BlogDetailContentNavigationClientContainer } from './BlogDetailContentNavigationContainer';

interface BlogDetailContentContainerClientProps {
  blog: BlogDetailUiState;
  isAuthor: boolean;
}

export const BlogDetailContentContainerClient = ({
  blog,
  isAuthor,
}: BlogDetailContentContainerClientProps) => {
  const { formAction } = useFormActionState(actBlogDetailDeleteBlog, {
    onSuccess() {
      const path =
        '/blog' +
        qs.stringify(
          {
            categoryId: blog.category.id,
            subCategoryId: blog.category.subCategoryId,
          },
          { addQueryPrefix: true },
        );

      toast.open('success', '게시글이 삭제 되었습니다.');
      redirect(path);
    },
    onError({ message }) {
      toast.open('error', message);
    },
  });

  const [isLiked, setIsLiked] = useState(false);

  const handleShare = () => {
    try {
      copy(window.location.href);
      toast.open('success', '클립 보드에 복사되었습니다.');
    } catch (err) {
      toast.open('error', '다시 시도해 주세요.');
    }
  };

  const handleLike = async () => {
    setIsLiked((prev) => !prev);
    await actBlogDetailAddLike(blog.id);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('삭제하십니까?')) {
      await formAction(id);
    }
  };

  useEffect(() => {
    setIsLiked(blogDetailService.checkLike(blog.id));
  }, [blog.id]);

  return (
    <>
      <BlogDetailContentHeader
        {...blog}
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
            <Markdown content={blog.content} />
            <BlogDetailContentAction
              isLiked={isLiked}
              onLike={handleLike}
              onShare={handleShare}
            />
          </>
        }
      />

      <BlogDetailContentUserMeta />
    </>
  );
};
