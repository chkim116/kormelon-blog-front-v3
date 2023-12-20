'use server';
import 'server-only';

import { ActionFnType } from '@shared/domains/common/sharedActions.uiState';
import { tagService } from '@shared/domains/tag';
import {
  TagSearchUiState,
  TagWithBlogsSearchPayloadData,
  TagWithBlogsSearchUiParams,
  TagSearchWithPostCountUiState,
} from '@shared/domains/tag/tag.uiState';
import {
  createActionRejectedWithError,
  createActionResolveWithData,
} from '@shared/domains/common/sharedActions.create';

export const actTagsSearchLoad: ActionFnType<
  string,
  TagSearchUiState[]
> = async (value) => {
  try {
    const tags = await tagService.fetchTagsByValue(value);

    return createActionResolveWithData(tags);
  } catch (err) {
    return createActionRejectedWithError(err);
  }
};

export const actTagsSearchAllLoad: ActionFnType<
  void,
  TagSearchWithPostCountUiState[]
> = async () => {
  try {
    const { tags } = await tagService.fetchAllTags();

    return createActionResolveWithData(tags);
  } catch (err) {
    return createActionRejectedWithError(err);
  }
};

export const actTagsCreate: ActionFnType<string, TagSearchUiState> = async (
  value,
) => {
  try {
    const tag = await tagService.createTag(value);

    return createActionResolveWithData(tag);
  } catch (err) {
    return createActionRejectedWithError(err);
  }
};

export const actTagWithBlogsLoad: ActionFnType<
  TagWithBlogsSearchUiParams,
  TagWithBlogsSearchPayloadData
> = async (params) => {
  try {
    const tag = await tagService.fetchBlogByTagId(params);

    return createActionResolveWithData(tag);
  } catch (err) {
    return createActionRejectedWithError(err);
  }
};
