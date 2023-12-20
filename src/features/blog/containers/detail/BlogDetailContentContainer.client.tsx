'use client';
import { useEffect, useState } from 'react';
import copy from 'copy-to-clipboard';
import qs from 'qs';
import { redirect } from 'next/navigation';
import dynamic from 'next/dynamic';
import {
  actBlogDetailAddLike,
  actBlogDetailDeleteBlog,
} from '@features/blog/actions/blogDetail.action';
import { BlogDetailContentAction } from '@features/blog/components/detail/BlogDetailContentAction';
import { BlogDetailContentHeader } from '@features/blog/components/detail/BlogDetailContentHeader';
import { BlogDetailContentLayout } from '@features/blog/components/detail/BlogDetailContentLayout';
import { BlogDetailContentUserMeta } from '@features/blog/components/detail/BlogDetailContentUserMeta';
import { BlogDetailUiState } from '@features/blog/domains/detail/blogDetail.uiState';
import { blogDetailService } from '@features/blog/domains/detail';
import { toast } from '@shared/services/ToastService';
import { useFormActionState } from '@shared/hooks/useFormActionState';
import { BlogDetailContentNavigationClientContainer } from './BlogDetailContentNavigationContainer';

const Markdown = dynamic(
  () =>
    import('@shared/components/common/Markdown').then((comp) => comp.Markdown),
  { ssr: false },
);

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
