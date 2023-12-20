import { TagRepository } from '@shared/repositories/tag.repo.type';
import { toBlogSearchUiStates } from '@features/blog/domains/search/blogSearch.convert';
import {
  refineTagWithBlogsSearchUiParams,
  toPostSearchByTagParams,
  toTagSearchUiState,
  toTagSearchUiStates,
  toTagSearchWithPostCountUiStates,
} from './tag.convert';
import {
  TagSearchPayloadData,
  TagSearchUiState,
  TagWithBlogsSearchPayloadData,
  TagWithBlogsSearchUiParams,
} from './tag.uiState';

interface TagService {
  /**
   * 값을 이용한 태그 조회
   */
  fetchTagsByValue(value: string): Promise<TagSearchUiState[]>;
  /**
   * 모든 태그 가져오기
   */
  fetchAllTags(): Promise<TagSearchPayloadData>;
  /**
   *
   * @param value 값
   */
  createTag(value: string): Promise<TagSearchUiState>;
}

export class TagServiceImpl implements TagService {
  constructor(private tagRepo: TagRepository) {}

  async fetchTagsByValue(value: string): Promise<TagSearchUiState[]> {
    const { payload } = await this.tagRepo.fetchTagByValue(value);

    return toTagSearchUiStates(payload);
  }

  async fetchAllTags(): Promise<TagSearchPayloadData> {
    const { payload, meta } = await this.tagRepo.fetchAllTags();

    return {
      tags: toTagSearchWithPostCountUiStates(payload),
      total: meta.total,
    };
  }

  async createTag(value: string): Promise<TagSearchUiState> {
    const { payload } = await this.tagRepo.createTag(value);

    return toTagSearchUiState(payload);
  }

  refineQueryParams(raw: Record<string, unknown>): TagWithBlogsSearchUiParams {
    try {
      return refineTagWithBlogsSearchUiParams(raw);
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }

  async fetchBlogByTagId(
    params: TagWithBlogsSearchUiParams,
  ): Promise<TagWithBlogsSearchPayloadData> {
    const { payload, meta } = await this.tagRepo.fetchPostsByTagId(
      toPostSearchByTagParams(params),
    );

    return {
      blogs: toBlogSearchUiStates(payload),
      total: meta.total,
    };
  }
}
