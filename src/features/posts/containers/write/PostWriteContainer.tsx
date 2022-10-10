import { FormEventHandler, useEffect, useMemo, useState } from 'react';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { useDebouncedCallback } from 'use-debounce';
import { feedbackService } from '@common/components/Feedback';
import { useAppDispatch, useAppSelector } from '@common/store';
import { PostCreateParams, TagEntity } from '@core/entities';
import { repo } from '@core/repo';
import { PostCategory } from '@features/posts/components/write/PostCategory';
import { createPostCreateParams } from '@features/posts/manipulates/post.create';
import {
  effPostCreate,
  effPostDetailLoad,
  effPostUpdate,
  selPostDetail,
} from '@features/posts/stores';
import { effCategoriesLoad, selCategories } from '@features/settings/stores';
import {
  PostConfirm,
  PostTagSearch,
  PostWriteContent,
  PostWriteMeta,
  PostWriteThumbnail,
} from '../../components/write';

export const PostWriteContainer = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selCategories);
  const postDetail = useAppSelector(selPostDetail);
  const router = useRouter();

  const isEditMode = useMemo(() => !!router.query.edit, [router.query.edit]);
  const editId = useMemo(() => router.query.edit, [router.query.edit]);

  const [form, setForm] = useState<PostCreateParams>(createPostCreateParams());
  const [searchedTags, setSearchedTags] = useState<TagEntity[]>([]);
  const [selectedTags, setSelectedTags] = useState<TagEntity[]>([]);

  const debounced = useDebouncedCallback(async (text: string) => {
    const {
      data: { payload },
    } = await repo.tag.getTagByValue(text);

    const searchTags = payload.filter(
      (item) => !selectedTags.some((tag) => tag.id === item.id),
    );

    setSearchedTags(searchTags.length ? searchTags : [{ id: -1, value: text }]);
  }, 300);

  const handleUploadImage = async (file: File) => {
    const {
      data: { payload },
    } = await repo.post.uploadImage(file);

    setForm((prev) => ({ ...prev, thumbnail: payload }));
  };

  const handleChange = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeCategory = (name: string, id: number) => {
    setForm((prev) => ({ ...prev, [name]: id }));
  };

  const handleSearch = async (text: string) => {
    debounced(text);
  };

  const handleTagDelete = (id: number) => {
    setSelectedTags((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSelect = async (tag: TagEntity) => {
    if (tag?.id === -1) {
      const {
        data: { payload },
      } = await repo.tag.createTag(tag.value);

      setSelectedTags((prev) => {
        if (!prev.length) {
          return [payload];
        }

        if (prev.some((item) => payload.id === item.id)) {
          return prev.filter((item) => item.id !== payload.id);
        }

        return [...prev, payload];
      });

      return;
    }

    if (tag) {
      setSelectedTags((prev) => {
        if (!prev.length) {
          return [tag];
        }

        if (prev.some((item) => tag.id === item.id)) {
          return prev.filter((item) => item.id !== tag.id);
        }

        return [...prev, tag];
      });
    }
  };

  const handlePrivate = () => {
    setForm((prev) => ({ ...prev, isPrivate: !prev.isPrivate }));
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    for (const key in form) {
      if (
        ['content', 'title'].includes(key) &&
        !form[key as keyof PostCreateParams]
      ) {
        feedbackService('error', '제목 또는 본문을 입력해 주세요.');
        return;
      }
    }

    dispatch(
      isEditMode
        ? effPostUpdate({
            ...form,
            id: postDetail.id,
            tags: selectedTags.map((tag) => tag.id),
          })
        : effPostCreate({
            ...form,
            tags: selectedTags.map((tag) => tag.id),
          }),
    )
      .unwrap()
      .then(() => {
        router.push(
          `/posts?categoryId=${form.categoryId}&subCategoryId=${form.subCategoryId}`,
        );
        feedbackService(
          'success',
          `게시글이 ${isEditMode ? '수정' : '작성'}되었습니다.`,
        );
      })
      .catch((err) => feedbackService('error', err.response.data.message));
  };

  useEffect(() => {
    if (!categories.length) {
      dispatch(effCategoriesLoad());
    }
  }, [categories.length, dispatch]);

  useEffect(() => {
    if (isEditMode) {
      dispatch(effPostDetailLoad(Number(editId)))
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
      <PostWriteThumbnail
        previewThumbnail={form.thumbnail}
        onUploadImage={handleUploadImage}
      />
      <PostCategory
        categories={categories}
        categoryId={form.categoryId}
        subCategoryId={form.subCategoryId}
        onChangeCategory={handleChangeCategory}
      />
      <PostWriteMeta
        title={form.title}
        preview={form.preview}
        onChange={handleChange}
      />
      <PostTagSearch
        searchedTags={searchedTags}
        selectedTags={selectedTags}
        onSearch={handleSearch}
        onDelete={handleTagDelete}
        onSelect={handleSelect}
      />
      <PostWriteContent content={form.content} onChange={handleChange} />
      <PostConfirm isPrivate={form.isPrivate} onPrivate={handlePrivate} />
    </Box>
  );
};
