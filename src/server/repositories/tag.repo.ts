import {
  Response,
  TagEntity,
  TagMetaEntity,
  TagWithPostEntity,
} from '@server/entities';
import { apiClient } from '@core/network';

export const tagRepository = {
  /**
   * 태그를 값에 따라 조회한다.
   *
   * @param value
   * @returns
   */
  getTagByValue(value: string) {
    return apiClient.get<Response<TagEntity[], TagMetaEntity>>(`/tag/${value}`);
  },

  /**
   * 태그를 생성한다.
   *
   * @param value
   * @returns
   */
  createTag(value: string) {
    return apiClient.post<Response<TagEntity>>('/tag', { value });
  },

  /**
   * 모든 태그를 조회한다.
   *
   * @returns
   */
  getAllTags() {
    return apiClient.get<Response<TagWithPostEntity[], TagMetaEntity>>('/tag');
  },
};
