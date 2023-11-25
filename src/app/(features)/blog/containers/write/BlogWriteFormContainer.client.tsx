'use client';

import { useMemo, useState } from 'react';
import { Button } from '@nextui-org/react';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { LucideIcon } from '@shared/components/common/Icon';
import { BlogWriteCreateUiParams } from '@domain/blog/write/blogWrite.uiState';
import { toast } from 'src/app/shared/services/ToastService';
import { CategorySearchUiState } from '@domain/category/category.uiState';
import { BlogDetailUiState } from '@domain/blog/detail/blogDetail.uiState';
import { toBlogWriteCreateUiParams } from '@domain/blog/write/blogWrite.convert';
import { SubmitButton } from 'src/app/shared/components/common/SubmitButton';
import { createBlogWriteCreateUiParams } from '@domain/blog/write/blogWrite.create';
import { BlogWriteContentWriteContainerClient } from './BlogWriteContentWriteContainer.client';
import { BlogWriteMetaWriteContainerClient } from './BlogWriteMetaWriteContainer.client';
import { BlogWriteTagSearchContainerClient } from './BlogWriteTagSearchContainer.client';

interface BlogWriteFormContainerClientProps {
  categories: CategorySearchUiState[];
  blog: BlogDetailUiState;
  onSubmit: (params: BlogWriteCreateUiParams) => void;
}

// TODO: 성능 개선
export const BlogWriteFormContainerClient = ({
  categories,
  blog,
  onSubmit,
}: BlogWriteFormContainerClientProps) => {
  const [form, setForm] = useState(createBlogWriteCreateUiParams());

  const handleChange = (dto: Partial<BlogWriteCreateUiParams>) => {
    setForm((prev) => ({ ...prev, ...dto }));
  };

  const handlePrivate = () => {
    setForm((prev) => ({ ...prev, isPrivate: !prev.isPrivate }));
  };

  const handleSubmit = () => {
    for (const key in form) {
      if (
        ['content', 'title'].includes(key) &&
        !form[key as keyof BlogWriteCreateUiParams]
      ) {
        toast.open('error', '제목 또는 본문을 입력해 주세요.');
        return;
      }

      if (
        ['categoryId', 'subCategoryId'].includes(key) &&
        !form[key as keyof BlogWriteCreateUiParams]
      ) {
        toast.open('error', '카테고리를 선택해 주세요.');
        return;
      }
    }

    onSubmit(form);
  };

  const secretText = useMemo(
    () => (
      <LucideIcon name={form.isPrivate ? 'lock-keyhole' : 'unlock-keyhole'} />
    ),
    [form.isPrivate],
  );

  useDeepCompareEffect(() => {
    setForm(toBlogWriteCreateUiParams(blog));
  }, [blog]);

  return (
    <form action={handleSubmit}>
      <BlogWriteMetaWriteContainerClient
        categories={categories}
        title={form.title}
        preview={form.preview}
        thumbnail={form.thumbnail}
        categoryId={form.categoryId}
        subCategoryId={form.subCategoryId}
        onChange={handleChange}
      />

      <BlogWriteTagSearchContainerClient
        selectedTags={form.tags}
        onChange={handleChange}
      />

      <BlogWriteContentWriteContainerClient
        content={form.content}
        onChange={handleChange}
      />

      <div className="flex justify-start mt-2 gap-1 max-w-4xl mx-auto w-full">
        <Button
          variant="bordered"
          color={form.isPrivate ? 'success' : 'danger'}
          onClick={handlePrivate}
        >
          {secretText}
        </Button>
        <SubmitButton type="submit" color="primary">
          게시
        </SubmitButton>
      </div>
    </form>
  );
};
