import {
  PostSearchByTagParams,
  PostSearchEntity,
  Response,
  TagSearchEntity,
  TagSearchMetaEntity,
  TagSearchWithPostEntity,
} from '@server/entities';
import { authApiServer, baseApiServer } from '@core/network/apiServer';
import { TagRepository } from './types';

class TagRepositoryImpl implements TagRepository {
  /**
   * 태그를 값에 따라 조회한다.
   *
   * @param value
   * @returns
   */
  fetchTagByValue(value: string) {
    return baseApiServer<Response<TagSearchEntity[], TagSearchMetaEntity>>(
      `/tag/${value}`,
      { method: 'GET' },
    );
  }

  /**
   * 태그를 생성한다.
   *
   * @param value
   * @returns
   */
  createTag(value: string) {
    return authApiServer<Response<TagSearchEntity>>('/tag', {
      method: 'POST',
      body: value,
    });
  }

  /**
   * 모든 태그를 조회한다.
   *
   * @returns
   */
  fetchAllTags() {
    return baseApiServer<
      Response<TagSearchWithPostEntity[], TagSearchMetaEntity>
    >('/tag', {
      method: 'GET',
    });
  }

  /**
   * 태그로 게시글 조회
   */
  fetchPostsByTagId(params: PostSearchByTagParams) {
    return baseApiServer<Response<PostSearchEntity[], TagSearchMetaEntity>>(
      '/post/search/tag',
      { method: 'GET', query: params },
    );
  }
}

export const tagRepository = new TagRepositoryImpl();
