'use client';
import { useMemo } from 'react';
import { toBoolean } from 'safers';
import {
  actBlogWriteCreate,
  actBlogWriteUpdate,
} from '@features/blog/actions/blogWrite.action';
import { BlogDetailUiState } from '@features/blog/domains/detail/blogDetail.uiState';
import { BlogWriteCreateUiParams } from '@features/blog/domains/write/blogWrite.uiState';
import { CategorySearchUiState } from '@features/categories/domains/category.uiState';
import { toast } from '@shared/services/ToastService';
import { useFormActionState } from '@shared/hooks/useFormActionState';
import { useQueryPush } from '@shared/hooks/useQueryPush';
import { BlogWriteFormContainerClient } from './BlogWriteFormContainer.client';

interface BlogWriteContainerClientProps {
  categories: CategorySearchUiState[];
  blog: BlogDetailUiState;
  editId: number;
}

export function BlogWriteContainerClient({
  categories,
  editId,
  blog,
}: BlogWriteContainerClientProps) {
  const navigate = useQueryPush();

  const isEditMode = useMemo(() => toBoolean(editId), [editId]);

  const { formAction: updateSubmit } = useFormActionState(actBlogWriteUpdate, {
    onSuccess({ data }) {
      const toastText = data.isPrivate ? '비공개' : '수정';
      toast.open('success', `게시글이 ${toastText} 되었습니다.`);
      navigate(
        { categoryId: data.categoryId, subCategory: data.subCategoryId },
        '/blog',
      );
    },
    onError({ message }) {
      toast.open('error', message);
    },
  });

  const { formAction: createSubmit } = useFormActionState(actBlogWriteCreate, {
    onSuccess({ data }) {
      toast.open('success', '게시글이 생성 되었습니다.');
      navigate(
        { categoryId: data.categoryId, subCategory: data.subCategoryId },
        '/blog',
      );
    },
    onError({ message }) {
      toast.open('error', message);
    },
  });

  const handleSubmit = (params: BlogWriteCreateUiParams) => {
    if (isEditMode) {
      updateSubmit({
        ...params,
        id: blog.id,
      });
      return;
    }

    createSubmit(params);
  };

  return (
    <BlogWriteFormContainerClient
      categories={categories}
      blog={blog}
      onSubmit={handleSubmit}
    />
  );
}
