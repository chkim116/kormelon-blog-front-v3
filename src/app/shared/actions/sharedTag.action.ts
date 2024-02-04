'use server';
import 'server-only';

import { tagService } from '@domain/tag';
import {
  TagSearchUiState,
  TagWithBlogsSearchPayloadData,
  TagWithBlogsSearchUiParams,
  TagSearchWithPostCountUiState,
} from '@domain/tag/tag.uiState';
import {
  createActionRejectedWithError,
  createActionResolveWithData,
} from 'src/app/shared/manipulates/sharedActions.create';
import { ActionFnType } from 'src/app/shared/uiStates/sharedActions.uiState';

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
