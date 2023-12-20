import { toNumber } from 'safers';
import { tokenProvider } from '@core/storage/tokenProvider';
import { STORAGE_LIKE_KEY } from '@core/storage/token.const';
import {
  PagingMeta,
  PostCreateParams,
  PostDetailResultEntityPayload,
  PostPrivateSearchEntity,
  PostRecommendEntity,
  PostRssEntity,
  PostSearchEntity,
  PostSearchParams,
  PostUpdateParams,
  Response,
  ResponseWithFetch,
} from '@shared/entities';
import { authApiServer, baseApiServer } from '@core/server/apiServer';
import { PostRepository } from './post.repo.type';

class PostRepositoryImpl implements PostRepository {
  fetchRecommendPosts(
    excludeId: number,
    take: number,
  ): ResponseWithFetch<PostRecommendEntity[], PagingMeta> {
    return baseApiServer(
      `/post/recommend?take=${take}&excludeId=${excludeId}`,
      {
        method: 'GET',
      },
    );
  }

  fetchPosts(
    params: PostSearchParams,
  ): ResponseWithFetch<PostSearchEntity[], PagingMeta> {
    return baseApiServer<Response<PostSearchEntity[], PagingMeta>>('/post', {
      method: 'GET',
      query: params,
    });
  }

  fetchPrivatePosts(): ResponseWithFetch<
    PostPrivateSearchEntity[],
    PagingMeta
    > {
    return authApiServer<Response<PostPrivateSearchEntity[], PagingMeta>>(
      '/private',
      {
        method: 'GET',
      },
    );
  }

  fetchPostRss(): ResponseWithFetch<PostRssEntity[], null> {
    return baseApiServer<Response<PostRssEntity[]>>('/post/rss', {
      method: 'GET',
    });
  }

  fetchPostById(
    id: number,
  ): ResponseWithFetch<PostDetailResultEntityPayload, null> {
    return baseApiServer<Response<PostDetailResultEntityPayload>>(
      `/post/${id}`,
      {
        method: 'GET',
      },
    );
  }

  fetchPrivatePostById(
    id: number,
  ): ResponseWithFetch<PostDetailResultEntityPayload, null> {
    return authApiServer<Response<PostDetailResultEntityPayload>>(
      `/private/${id}`,
      {
        method: 'GET',
      },
    );
  }

  addLikePost(id: number): ResponseWithFetch | undefined {
    const currentLiked = tokenProvider.get<number[]>(STORAGE_LIKE_KEY) || [];
    const exist = currentLiked.includes(id);

    if (exist) {
      tokenProvider.set(
        STORAGE_LIKE_KEY,
        currentLiked.filter((currentId) => toNumber(currentId) !== id),
      );

      return;
    }
    tokenProvider.set(STORAGE_LIKE_KEY, [...currentLiked, id]);
    return baseApiServer<Response>(`/post/like?id=${id}`, {
      method: 'POST',
    });
  }

  checkLike(postId: number): boolean {
    return Boolean(
      tokenProvider.get<number[]>(STORAGE_LIKE_KEY)?.includes(postId),
    );
  }

  addPostView(id: number): ResponseWithFetch {
    return baseApiServer<Response>(`/post/${id}`, {
      method: 'PUT',
    });
  }

  createPost(params: PostCreateParams): ResponseWithFetch {
    return authApiServer<Response>('/post', {
      method: 'POST',
      body: params,
    });
  }

  updatePost(params: PostUpdateParams): ResponseWithFetch {
    return authApiServer<Response>('/post', {
      method: 'PUT',
      body: params,
    });
  }

  deletePost(id: number): ResponseWithFetch {
    return authApiServer<Response>(`/post?id=${id}`, {
      method: 'DELETE',
    });
  }

  uploadImage(fd: FormData): ResponseWithFetch<string, null> {
    return authApiServer<Response<string>>('/post/image', {
      method: 'POST',
      body: fd,
    });
  }
}

export const postRepository = new PostRepositoryImpl();
