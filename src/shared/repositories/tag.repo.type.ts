import {
  PostSearchByTagParams,
  PostSearchEntity,
  ResponseWithFetch,
  TagSearchEntity,
  TagSearchMetaEntity,
  TagSearchWithPostEntity,
} from '@shared/entities';

export interface TagRepository {
  /**
   * 태그를 값에 따라 조회한다.
   *
   * @param value
   * @returns
   */
  fetchTagByValue(
    value: string,
  ): ResponseWithFetch<TagSearchEntity[], TagSearchMetaEntity>;

  /**
   * 태그를 생성한다.
   *
   * @param value
   * @returns
   */
  createTag(value: string): ResponseWithFetch<TagSearchEntity>;

  /**
   * 모든 태그를 조회한다.
   *
   * @returns
   */
  fetchAllTags(): ResponseWithFetch<
    TagSearchWithPostEntity[],
    TagSearchMetaEntity
  >;

  /**
   * 태그로 게시글 조회
   */
  fetchPostsByTagId(
    params: PostSearchByTagParams,
  ): ResponseWithFetch<PostSearchEntity[], TagSearchMetaEntity>;
}
