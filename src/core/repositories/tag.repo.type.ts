import {
  PostSearchByTagParams,
  PostSearchEntity,
  PromisePrismaResolveResponse,
  TagSearchEntity,
  TagSearchMetaEntity,
  TagSearchWithPostEntity,
} from '@core/entities';

export interface TagRepository {
  /**
   * 태그를 값에 따라 조회한다.
   *
   * @param value
   * @returns
   */
  fetchTagByValue(
    value: string,
  ): PromisePrismaResolveResponse<TagSearchEntity[], TagSearchMetaEntity>;

  /**
   * 태그를 생성한다.
   *
   * @param value
   * @returns
   */
  createTag(value: string): PromisePrismaResolveResponse<TagSearchEntity>;

  /**
   * 모든 태그를 조회한다.
   *
   * @returns
   */
  fetchAllTags(): PromisePrismaResolveResponse<
    TagSearchWithPostEntity[],
    TagSearchMetaEntity
  >;

  /**
   * 태그로 게시글 조회
   */
  fetchPostsByTagId(
    params: PostSearchByTagParams,
  ): PromisePrismaResolveResponse<PostSearchEntity[], TagSearchMetaEntity>;
}
