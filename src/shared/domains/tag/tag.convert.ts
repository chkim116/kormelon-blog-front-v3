import { removeEmptyKeys, toNumber, toString } from 'safers';
import { TagSearchEntity, TagSearchWithPostEntity } from '@core/entities';
import {
  TagSearchUiState,
  TagSearchWithPostCountUiState,
  TagWithBlogsSearchUiParams,
} from './tag.uiState';

export function toTagSearchUiState(entity: TagSearchEntity) {
  const result: TagSearchUiState = {
    id: entity.id,
    value: entity.value,
  };

  return result;
}

export function toTagSearchUiStates(entities: TagSearchEntity[]) {
  return entities.map(toTagSearchUiState);
}

export function toTagSearchWithPostCountUiStates(
  entities: TagSearchWithPostEntity[],
) {
  return entities.map((entity) => {
    const result: TagSearchWithPostCountUiState = {
      id: entity.id,
      value: entity.value,
      posts: entity.posts.map((post) => post.id),
    };

    return result;
  });
}

export function refineTagWithBlogsSearchUiParams(raw: Record<string, unknown>) {
  const { tagId, tagValue } = raw;

  const result: TagWithBlogsSearchUiParams = {
    tagId: toNumber(tagId, 0),
    tagValue: toString(tagValue, ''),
  };

  return removeEmptyKeys(result);
}

export function toPostSearchByTagParams(uiState: TagWithBlogsSearchUiParams) {
  const result: TagWithBlogsSearchUiParams = {
    tagId: uiState.tagId,
    tagValue: uiState.tagValue,
  };

  return removeEmptyKeys(result);
}
