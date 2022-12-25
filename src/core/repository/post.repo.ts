import { STORAGE_LIKE_KEY } from '@common/constants';
import {
  PagingMeta,
  BlogPostCreateParams,
  BlogPostDetailResultEntityPayload,
  BlogPostEntity,
  BlogPostRecommendEntity,
  BlogPostSearchParams,
  BlogPostUpdateParams,
  Response,
  BlogPostSearchByTagParams,
  TagMetaEntity,
  BlogPrivatePostEntity,
  BlogPostRssEntity,
} from '@core/entities';
import { apiClient } from '@core/network';
import { tokenProvider } from '@core/tokenProvider';

export const postRepository = {
  fetchRecommendPosts(take = 4) {
    return apiClient.get<Response<BlogPostRecommendEntity[], PagingMeta>>(
      `/post/recommend?take=${take}`,
    );
  },

  /**
   * 태그로 게시글 조회
   */
  fetchPostsByTagId(params: BlogPostSearchByTagParams) {
    return apiClient.get<Response<BlogPostEntity[], TagMetaEntity>>(
      '/post/search/tag',
      { params },
    );
  },

  /**
   * 게시글 조회
   *
   * @param params
   * @returns
   */
  fetchPosts(params: BlogPostSearchParams) {
    return apiClient.get<Response<BlogPostEntity[], PagingMeta>>('/post', {
      params,
    });
  },

  /**
   * 비밀 게시글 조회
   *
   * @returns
   */
  fetchPrivatePosts() {
    return apiClient.get<Response<BlogPrivatePostEntity[], PagingMeta>>(
      '/private',
    );
  },

  /**
   * RSS 피드 조회
   */
  fetchPostRss() {
    return apiClient.get<Response<BlogPostRssEntity[]>>('/post/rss');
  },

  /**
   * 게시글 생성
   *
   * @param params
   * @returns
   */
  createPost(params: BlogPostCreateParams) {
    return apiClient.post<Response>('/post', params);
  },

  /**
   * 게시글 수정
   *
   * @param params
   * @returns
   */
  updatePost(params: BlogPostUpdateParams) {
    return apiClient.put<Response>('/post', params);
  },

  /**
   * 게시글 삭제
   *
   * @param id
   * @returns
   */
  deletePost(id: number) {
    return apiClient.delete<Response>(`/post?id=${id}`);
  },

  /**
   * 게시글 상세 조회
   *
   * @param id
   * @returns
   */
  fetchPostById(id: number) {
    return apiClient.get<Response<BlogPostDetailResultEntityPayload>>(
      `/post/${id}`,
    );
  },

  /**
   * 비밀 게시글 상세 조회
   *
   * @param id
   * @returns
   */
  fetchPrivatePostById(id: number) {
    return apiClient.get<Response<BlogPostDetailResultEntityPayload>>(
      `/private/${id}`,
    );
  },

  /**
   * 게시글 좋아요 추가
   *
   * @param id
   * @returns
   */
  addLikePost(id: number) {
    const currentLiked = tokenProvider().get<number[]>(STORAGE_LIKE_KEY) || [];
    const exist = currentLiked.includes(id);

    if (exist) {
      tokenProvider().set(
        STORAGE_LIKE_KEY,
        currentLiked.filter((currentId) => Number(currentId) !== id),
      );

      return;
    }
    tokenProvider().set(STORAGE_LIKE_KEY, [...currentLiked, id]);
    return apiClient.post<Response>(`/post/like?id=${id}`);
  },

  /**
   * 게시글 조회 수 증가
   *
   * @param id
   * @returns
   */
  addPostView(id: number) {
    return apiClient.put<Response>(`/post/${id}`);
  },

  /**
   * 게시글에 이미지를 업로드한다.
   *
   * @param file
   * @returns
   */
  uploadImage(file: File) {
    const formData = new FormData();

    formData.append('image', file);

    return apiClient.post<Response<string>>('/post/image', formData);
  },
};
