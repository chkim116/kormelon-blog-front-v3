import readingTime from 'reading-time';
import { toNumber } from 'safers';
import {
  PostCreateParams,
  PostDetailEntity,
  PostPrivateSearchEntity,
  PostRecommendEntity,
  PostRssEntity,
  PostSearchEntity,
  PostSearchParams,
  PostUpdateParams,
} from '@core/entities';
import prisma from '@core/lib/prisma';
import { prismaResolveHandler } from '@core/network/payloadHandler';
import { STORAGE_LIKE_KEY } from '@core/storage/token.const';
import { tokenProvider } from '@core/storage/tokenProvider';
import { PostRepository } from './post.repo.type';

class PostRepositoryImpl implements PostRepository {
  /**
   *
   * 추천 게시글을 조회한다. 조회수 기준이다.
   *
   * @param excludeId 제외할 아이디
   * @param take 취할 게시글 갯수
   * @returns
   */
  async fetchRecommendPosts(excludeId: number, take: number) {
    const posts: PostRecommendEntity[] = await prisma.post.findMany({
      where: {
        id: {
          not: excludeId,
        },
        isPrivate: false,
      },
      take,
      select: {
        id: true,
        title: true,
        createdAt: true,
        thumbnail: true,
        readTime: true,
        preview: true,
      },
      orderBy: {
        view: 'desc',
      },
    });

    return prismaResolveHandler(posts);
  }

  /**
   * 전체 게시글들을 조회한다.
   *
   * @param page 페이지 단위
   * @param per 페이지 당 게시글 수
   * @params keyword 페이지 제목
   * @params subCategoryId 카테고리 아이디
   * @returns
   */
  async fetchPosts(params: PostSearchParams) {
    const { categoryId, keyword, page = 1, per = 20, subCategoryId } = params;

    const posts: PostSearchEntity[] = await prisma.post.findMany({
      where: {
        categoryId,
        subCategoryId,
        title: {
          contains: keyword,
        },
        isPrivate: false,
      },
      skip: (page - 1) * per,
      take: per,
      select: {
        id: true,
        title: true,
        createdAt: true,
        thumbnail: true,
        readTime: true,
        preview: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return prismaResolveHandler(posts, { total: posts.length, page, per });
  }

  /**
   * 비밀 유지 중인 게시글을 조회한다.
   *
   * @returns
   */
  async fetchPrivatePosts() {
    const posts: PostPrivateSearchEntity[] = await prisma.post.findMany({
      where: {
        isPrivate: true,
      },
      select: {
        id: true,
        title: true,
        isPrivate: true,
        createdAt: true,
        thumbnail: true,
        readTime: true,
        preview: true,
      },
      orderBy: {
        id: 'desc',
      },
    });

    return prismaResolveHandler(posts, {
      total: posts.length,
      per: 0,
      page: 0,
    });
  }

  async fetchPostRss() {
    const posts: PostRssEntity[] = await prisma.post.findMany({
      where: {
        isPrivate: false,
      },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        thumbnail: true,
        readTime: true,
        preview: true,
      },
    });

    return prismaResolveHandler(posts);
  }

  /**
   * 게시글 상세 조회
   *
   * @param id
   */
  async fetchPostById(id: number) {
    const post = await prisma.post.findUnique({
      where: {
        id,
        isPrivate: false,
      },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        thumbnail: true,
        readTime: true,
        preview: true,
        view: true,
        isPrivate: true,
        like: true,
        category: {
          select: {
            id: true,
            value: true,
          },
        },
        subCategory: {
          select: {
            id: true,
            value: true,
          },
        },
        tags: {
          select: {
            id: true,
            value: true,
          },
        },
        user: {
          select: {
            id: true,
            username: true,
            profileImage: true,
          },
        },
      },
    });

    if (!post) {
      throw new Error('존재하지 않는 게시글입니다.');
    }

    const [next = null, prev = null] = await Promise.all([
      prisma.post.findFirst({
        where: {
          id: {
            gt: id,
          },
          isPrivate: false,
        },
        select: {
          id: true,
          title: true,
          thumbnail: true,
          createdAt: true,
        },
        orderBy: {
          id: 'asc',
        },
        take: 1,
      }),
      prisma.post.findFirst({
        where: {
          id: {
            lt: id,
          },
          isPrivate: false,
        },
        select: {
          id: true,
          title: true,
          thumbnail: true,
          createdAt: true,
        },
        orderBy: {
          id: 'desc',
        },
      }),
    ]);

    return prismaResolveHandler({
      post,
      next,
      prev,
    });
  }

  async fetchPrivatePostById(id: number) {
    const post: PostDetailEntity | null = await prisma.post.findUnique({
      where: {
        id,
        isPrivate: true,
      },
      select: {
        id: true,
        title: true,
        preview: true,
        readTime: true,
        thumbnail: true,
        content: true,
        view: true,
        createdAt: true,
        like: true,
        isPrivate: true,
        category: {
          select: {
            id: true,
            value: true,
          },
        },
        subCategory: {
          select: {
            id: true,
            value: true,
          },
        },
        tags: {
          select: {
            id: true,
            value: true,
          },
        },
        user: {
          select: {
            id: true,
            username: true,
            profileImage: true,
          },
        },
      },
    });

    if (!post) {
      throw new Error('존재하지 않는 게시글입니다.');
    }

    return prismaResolveHandler({ post, next: null, prev: null });
  }

  async createPost(params: PostCreateParams) {
    await prisma.post.create({
      data: {
        title: params.title,
        preview: params.preview,
        content: params.content,
        thumbnail: params.thumbnail,
        readTime: readingTime(params.content, { wordsPerMinute: 300 }).minutes,
        isPrivate: params.isPrivate,
        categoryId: params.categoryId,
        subCategoryId: params.subCategoryId,
        tags: {
          connect: params.tags.map((tag) => ({
            id: tag,
          })),
        },
        userId: params.userId,
      },
    });

    return prismaResolveHandler();
  }

  /**
   * 게시글을 수정한다.
   *
   * @param params
   */
  async updatePost(params: PostUpdateParams) {
    await this.exist(params.id);

    await prisma.post.update({
      where: {
        id: params.id,
      },
      data: {
        title: params.title,
        preview: params.preview,
        content: params.content,
        thumbnail: params.thumbnail,
        readTime: readingTime(params.content, { wordsPerMinute: 300 }).minutes,
        isPrivate: params.isPrivate,
        categoryId: params.categoryId,
        subCategoryId: params.subCategoryId,
        tags: {
          set: params.tags.map((tag) => ({
            id: tag,
          })),
        },
      },
    });

    return prismaResolveHandler();
  }

  /**
   * 게시글을 삭제한다.
   * @param id
   */
  async deletePost(id: number) {
    await prisma.post.delete({
      where: {
        id,
      },
    });

    return prismaResolveHandler();
  }

  /**
   * 게시글 좋아요
   *
   * @deprecated storage 부분 service로 이관.
   */
  async addLikePost(id: number) {
    const currentLiked = tokenProvider.get<number[]>(STORAGE_LIKE_KEY) || [];
    const exist = currentLiked.includes(id);

    if (exist) {
      tokenProvider.set(
        STORAGE_LIKE_KEY,
        currentLiked.filter((currentId) => toNumber(currentId) !== id),
      );

      return prismaResolveHandler();
    }

    tokenProvider.set(STORAGE_LIKE_KEY, [...currentLiked, id]);

    await prisma.post.update({
      where: {
        id,
      },
      data: {
        like: {
          increment: 1,
        },
      },
    });

    return prismaResolveHandler();
  }

  /**
   * 게시글 확인
   *
   * @deprecated storage 부분 service로 이관.
   */
  checkLike(postId: number): boolean {
    return Boolean(
      tokenProvider.get<number[]>(STORAGE_LIKE_KEY)?.includes(postId),
    );
  }

  /**
   * 게시글 조회수 증가
   *
   * @param id
   */
  async addPostView(id: number) {
    await prisma.post.update({
      where: {
        id,
      },
      data: {
        view: {
          increment: 1,
        },
      },
    });

    return prismaResolveHandler();
  }

  /**
   * 게시글이 존재하는지 확인한다.
   *
   * @param id
   * @returns
   */
  private async exist(id: number) {
    const post = await prisma.post.findUnique({ where: { id } });

    if (!post) {
      throw new Error('존재하지 않는 게시글입니다.');
    }

    return post;
  }
}

export const postRepository = new PostRepositoryImpl();
