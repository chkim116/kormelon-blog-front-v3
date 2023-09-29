'use client';
/* eslint-disable indent */
import { FormEventHandler, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@shared/stores';
import { toast } from '@shared/services';
import { effCategoriesLoad } from '@shared/stores/category';
import { useQueryParser } from '@shared/hooks';
import {
  refineBlogWriteParams,
  toBlogPostCreateParams,
} from '@domain/manipulates';
import { createBlogPostCreateParams } from '@domain/manipulates/blog.create';
import {
  BlogPostCreateParams,
  TagEntity,
  UserRoleEnum,
} from '@server/entities';
import { selUserData } from '@shared/stores/auth';
import {
  effBlogPostCreate,
  effBlogPostDetailLoad,
  effBlogPostUpdate,
  effBlogPrivatePostDetailLoad,
  selBlogPostDetail,
} from '@app/blog/stores';
import { BlogWriteConfirm } from '../../components/write';
import { BlogWriteContentWriteClientContainer } from './BlogWriteContentWriteClientContainer';
import { BlogWriteMetaWriteClientContainer } from './BlogWriteMetaWriteClientContainer';
import { BlogWriteTagSearchClientContainer } from './BlogWriteTagSearchClientContainer';

export const BlogWriteClientContainer = () => {
  const user = useAppSelector(selUserData);
  const { editId, isPrivateMode } = useQueryParser(refineBlogWriteParams);
  const router = useRouter();

  const dispatch = useAppDispatch();
  const postDetail = useAppSelector(selBlogPostDetail);

  const isEditMode = useMemo(() => !!editId, [editId]);
  const isNoAdmin = !user.id || user.role === UserRoleEnum.MEMBER;

  const [form, setForm] = useState<BlogPostCreateParams>(
    createBlogPostCreateParams(),
  );
  const [selectedTags, setSelectedTags] = useState<TagEntity[]>([]);

  const handleChange = (dto: Partial<BlogPostCreateParams>) => {
    setForm((prev) => ({ ...prev, ...dto }));
  };

  const handlePrivate = () => {
    setForm((prev) => ({ ...prev, isPrivate: !prev.isPrivate }));
  };

  // TODO: validate 리팩터링
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    for (const key in form) {
      if (
        ['content', 'title'].includes(key) &&
        !form[key as keyof BlogPostCreateParams]
      ) {
        toast.open('error', '제목 또는 본문을 입력해 주세요.');
        return;
      }

      if (
        ['categoryId', 'subCategoryId'].includes(key) &&
        !form[key as keyof BlogPostCreateParams]
      ) {
        toast.open('error', '카테고리를 선택해 주세요.');
        return;
      }
    }

    const effect = isEditMode
      ? effBlogPostUpdate({
          ...form,
          id: postDetail.id,
        })
      : effBlogPostCreate(form);

    dispatch(effect)
      .unwrap()
      .then(() => {
        router.push(
          `/blog?categoryId=${form.categoryId}&subCategoryId=${form.subCategoryId}`,
        );
        toast.open(
          'success',
          `게시글이 ${isEditMode ? '수정' : '작성'}되었습니다.`,
        );
      })
      .catch((err) => toast.open('error', err.message));
  };

  useEffect(() => {
    dispatch(effCategoriesLoad());
  }, [dispatch]);

  useEffect(() => {
    if (isEditMode) {
      const effect = isPrivateMode
        ? effBlogPrivatePostDetailLoad(editId)
        : effBlogPostDetailLoad(editId);

      dispatch(effect)
        .unwrap()
        .then(({ post }) => {
          setForm((prev) => toBlogPostCreateParams({ ...prev, ...post }));
          setSelectedTags(post.tags);
        });
    }
  }, [dispatch, editId, isEditMode, isPrivateMode]);

  if (isNoAdmin) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        접근할 수 없습니다.
      </div>
    );
  }

  return (
    <form className="max-5xl mx-auto p-4 sm:p-12" onSubmit={handleSubmit}>
      <BlogWriteMetaWriteClientContainer
        title={form.title}
        preview={form.preview}
        thumbnail={form.thumbnail}
        categoryId={form.categoryId}
        subCategoryId={form.subCategoryId}
        onChange={handleChange}
      />
      <BlogWriteTagSearchClientContainer
        selectedTags={selectedTags}
        onChange={handleChange}
      />
      <BlogWriteContentWriteClientContainer
        content={form.content}
        onChange={handleChange}
      />
      <BlogWriteConfirm isPrivate={form.isPrivate} onPrivate={handlePrivate} />
    </form>
  );
};
