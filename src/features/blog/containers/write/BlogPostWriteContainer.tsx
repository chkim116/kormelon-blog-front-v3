/* eslint-disable indent */
import { FormEventHandler, useEffect, useMemo, useState } from 'react';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { feedbackService } from '@common/components/Feedback';
import { useAppDispatch, useAppSelector } from '@common/store';
import { BlogPostCreateParams, TagEntity } from '@core/entities';
import { effCategoriesLoad, selCategories } from '@shared/stores/category';
import { createBlogPostCreateParams } from '@features/blog/manipulates/blog.create';
import {
  effBlogPostCreate,
  effBlogPostDetailLoad,
  effBlogPostUpdate,
  selBlogPostDetail,
} from '@features/blog/stores';
import { PostConfirm } from '../../components/write';
import { BlogPostContentWriteContainer } from './BlogPostContentWriteContainer';
import { BlogPostMetaWriteContainer } from './BlogPostMetaWriteContainer';
import { BlogPostTagSearchContainer } from './BlogPostTagSearchContainer';

export const BlogPostWriteContainer = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const categories = useAppSelector(selCategories);
  const postDetail = useAppSelector(selBlogPostDetail);

  const isEditMode = useMemo(() => !!router.query.edit, [router.query.edit]);
  const editId = useMemo(() => router.query.edit, [router.query.edit]);

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
        feedbackService('error', '제목 또는 본문을 입력해 주세요.');
        return;
      }

      if (
        ['categoryId', 'subCategoryId'].includes(key) &&
        !form[key as keyof BlogPostCreateParams]
      ) {
        feedbackService('error', '카테고리를 선택해 주세요.');
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
        feedbackService(
          'success',
          `게시글이 ${isEditMode ? '수정' : '작성'}되었습니다.`,
        );
      })
      .catch((err) => feedbackService('error', err.message));
  };

  useEffect(() => {
    if (!categories.length) {
      dispatch(effCategoriesLoad());
    }
  }, [categories.length, dispatch]);

  useEffect(() => {
    if (isEditMode) {
      dispatch(effBlogPostDetailLoad(Number(editId)))
        .unwrap()
        .then(
          ({
            post: {
              category,
              content,
              isPrivate,
              preview,
              thumbnail,
              tags,
              title,
            },
          }) => {
            setForm((prev) => ({
              ...prev,
              categoryId: category.id,
              subCategoryId: category.subCategoryId,
              tags: tags.map((tag) => tag.id),
              content: content,
              isPrivate: isPrivate,
              preview: preview,
              thumbnail: thumbnail,
              title: title,
            }));

            setSelectedTags(tags);
          },
        );
    }
  }, [dispatch, editId, isEditMode]);

  return (
    <Box
      maxWidth="lg"
      m="0 auto"
      p={12}
      component="form"
      onSubmit={handleSubmit}
    >
      <BlogPostMetaWriteContainer
        title={form.title}
        preview={form.preview}
        thumbnail={form.thumbnail}
        categoryId={form.categoryId}
        subCategoryId={form.subCategoryId}
        onChange={handleChange}
      />
      <BlogPostTagSearchContainer
        selectedTags={selectedTags}
        onChange={handleChange}
      />
      <BlogPostContentWriteContainer
        content={form.content}
        onChange={handleChange}
      />
      <PostConfirm isPrivate={form.isPrivate} onPrivate={handlePrivate} />
    </Box>
  );
};
