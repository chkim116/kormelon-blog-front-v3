'use server';
import 'server-only';

import { CreateSafeAction } from '@common/lib/createSafeAction.uiState';
import { createSafeAction } from '@common/lib/createSafeAction';
import { tagService } from '@shared/domains/tag';
import {
  TagSearchUiState,
  TagWithBlogsSearchPayloadData,
  TagWithBlogsSearchUiParams,
  TagSearchWithPostCountUiState,
} from '@shared/domains/tag/tag.uiState';

export const actTagsSearchLoad: CreateSafeAction<string, TagSearchUiState[]> =
  createSafeAction(async (value) => {
    const tags = await tagService.fetchTagsByValue(value);

    return tags;
  }, []);

export const actTagsSearchAllLoad: CreateSafeAction<
  void,
  TagSearchWithPostCountUiState[]
> = createSafeAction(async () => {
  const { tags } = await tagService.fetchAllTags();

  return tags;
}, []);

export const actTagsCreate: CreateSafeAction<string, TagSearchUiState> =
  createSafeAction(async (value) => {
    const tag = await tagService.createTag(value);

    return tag;
  });

export const actTagWithBlogsLoad: CreateSafeAction<
  TagWithBlogsSearchUiParams,
  TagWithBlogsSearchPayloadData
> = createSafeAction(
  async (params) => {
    const tag = await tagService.fetchBlogByTagId(params);

    return tag;
  },
  {
    blogs: [],
    total: 0,
  },
);
