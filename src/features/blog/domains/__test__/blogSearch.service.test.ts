import { HttpError } from '@core/network/HttpError';
import {
  createMockFunctionWithRejectedValue,
  createMockFunctionWithResolvedValue,
} from '@fixtures/tests/mock.utils';
import {
  PagingMeta,
  PostPrivateSearchEntity,
  PostRecommendEntity,
  PostRssEntity,
  PostSearchEntity,
} from '@shared/entities';
import { calcTotalPage } from '@shared/utils/calcTotalPage';
import { PostSearchRepository } from '@features/blog/repositories/post.repo.type';
import {
  refineBlogSearchUiParams,
  toBlogSearchPrivateUiStates,
  toBlogSearchUiStates,
  toPostSearchParams,
} from '../search/blogSearch.convert';
import { createBlogSearchUiParams } from '../search/blogSearch.create';
import { BlogSearchServiceImpl } from '../search/blogSearch.service';

const TOTAL = 10;
const PER = 9;
const META: PagingMeta = {
  page: 1,
  per: PER,
  total: TOTAL,
};
const RESPONSE_POSTS: PostSearchEntity[] = [
  {
    id: 0,
    title: '',
    thumbnail: '',
    preview: '',
    readTime: 0,
    createdAt: '',
  },
];
const RESPONSE_PRIVATE_POSTS: PostPrivateSearchEntity[] = [
  {
    id: 0,
    title: '',
    thumbnail: '',
    preview: '',
    readTime: 0,
    createdAt: '',
    isPrivate: true,
  },
];
const RESPONSE_RECOMMEND_POSTS: PostRecommendEntity[] = [
  {
    id: 1,
    createdAt: '',
    preview: '',
    readTime: 3,
    thumbnail: '',
    title: '',
  },
];

const RESPONSE_RSS: PostRssEntity[] = [
  {
    id: 1,
    content: '',
    createdAt: '',
    title: '',
  },
];

const postSearchRepositoryMock: PostSearchRepository = {
  fetchRecommendPosts: createMockFunctionWithResolvedValue(
    RESPONSE_RECOMMEND_POSTS,
  ),
  fetchPosts: createMockFunctionWithResolvedValue(RESPONSE_POSTS, META),
  fetchPrivatePosts: createMockFunctionWithResolvedValue(
    RESPONSE_PRIVATE_POSTS,
    META,
  ),
  fetchPostRss: createMockFunctionWithResolvedValue(RESPONSE_RSS),
};

const blogSearchService = new BlogSearchServiceImpl(postSearchRepositoryMock);

describe('blogSearchService 성공 케이스', () => {
  it('게시글 호출', async () => {
    const params = createBlogSearchUiParams();
    const results = await blogSearchService.fetchBlogs(params);

    expect(postSearchRepositoryMock.fetchPosts).toHaveBeenCalledWith(
      toPostSearchParams(params),
    );
    expect(results).toEqual({
      blogs: toBlogSearchUiStates(RESPONSE_POSTS),
      total: TOTAL,
      totalPage: calcTotalPage(TOTAL, PER),
    });
  });

  it('비밀 게시글 호출', async () => {
    const results = await blogSearchService.fetchPrivateBlogs();

    expect(postSearchRepositoryMock.fetchPrivatePosts).toHaveBeenCalled();
    expect(results).toEqual({
      blogs: toBlogSearchPrivateUiStates(RESPONSE_PRIVATE_POSTS),
      total: TOTAL,
      totalPage: calcTotalPage(TOTAL, PER),
    });
  });

  it('게시글 추천 게시글 조회', async () => {
    const result = await blogSearchService.fetchRecommends(3);

    expect(postSearchRepositoryMock.fetchRecommendPosts).toHaveBeenCalled();
    expect(result).toEqual(toBlogSearchUiStates(RESPONSE_RECOMMEND_POSTS));
  });

  it('Rss 피드용 조회', async () => {
    const result = await blogSearchService.fetchRss();

    expect(postSearchRepositoryMock.fetchPostRss).toHaveBeenCalled();
    expect(result).toEqual(RESPONSE_RSS);
  });

  it('현 쿼리 파라미터 치환', () => {
    const raw = { page: 10, keyword: '안녕' };

    const result = blogSearchService.refineQueryParams(raw);

    expect(result).toEqual(refineBlogSearchUiParams(raw));
  });
});

describe('blogSearchService 실패 케이스', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Rss 피드용 호출 실패', () => {
    postSearchRepositoryMock.fetchPostRss = createMockFunctionWithRejectedValue(
      new HttpError('에러 발생'),
    );

    expect(blogSearchService.fetchRss()).rejects.toMatchObject({
      message: '에러 발생',
    });
    expect(postSearchRepositoryMock.fetchPostRss).toHaveBeenCalled();
  });

  it('게시글 호출 실패', () => {
    postSearchRepositoryMock.fetchPosts = createMockFunctionWithRejectedValue(
      new HttpError('에러 발생'),
    );
    const params = createBlogSearchUiParams();

    expect(blogSearchService.fetchBlogs(params)).rejects.toMatchObject({
      message: '에러 발생',
    });
    expect(postSearchRepositoryMock.fetchPosts).toHaveBeenCalled();
  });

  it('비밀 게시글 호출 실패', () => {
    postSearchRepositoryMock.fetchPrivatePosts =
      createMockFunctionWithRejectedValue(new HttpError('에러 발생'));

    expect(blogSearchService.fetchPrivateBlogs()).rejects.toMatchObject({
      message: '에러 발생',
    });
    expect(postSearchRepositoryMock.fetchPrivatePosts).toHaveBeenCalled();
  });

  it('추천 게시글 호출 실패', () => {
    postSearchRepositoryMock.fetchRecommendPosts =
      createMockFunctionWithRejectedValue(new HttpError('에러 발생'));

    expect(blogSearchService.fetchRecommends(3)).rejects.toMatchObject({
      message: '에러 발생',
    });
    expect(postSearchRepositoryMock.fetchRecommendPosts).toHaveBeenCalled();
  });
});
