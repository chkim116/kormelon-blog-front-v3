import { PostSearchByTagParams } from '@core/entities';
import prisma from '@core/lib/prisma';
import { prismaResolveHandler } from '@core/network/payloadHandler';
import { TagRepository } from './tag.repo.type';

class TagRepositoryImpl implements TagRepository {
  /**
   * 태그를 값에 따라 조회한다.
   *
   * @param value
   * @returns
   */
  async fetchTagByValue(value: string) {
    const tags = await prisma.tag.findMany({
      where: {
        value: {
          contains: value,
        },
      },
      select: {
        id: true,
        value: true,
      },
    });

    return prismaResolveHandler(tags, { total: tags.length, per: 0, page: 0 });
  }

  /**
   * 태그를 생성한다.
   *
   * @param value
   * @returns
   */
  async createTag(value: string) {
    await this.exist(value);

    const tag = await prisma.tag.create({
      data: {
        value,
      },
    });

    return prismaResolveHandler(tag);
  }

  /**
   * 모든 태그를 조회한다.
   *
   * @returns
   */
  async fetchAllTags() {
    const tags = await prisma.tag.findMany({
      select: {
        id: true,
        value: true,
        posts: {
          where: {
            isPrivate: false,
          },
          select: {
            id: true,
          },
        },
      },
    });

    return prismaResolveHandler(tags, { total: tags.length, per: 0, page: 0 });
  }

  /**
   * 태그로 게시글 조회
   */
  async fetchPostsByTagId(params: PostSearchByTagParams) {
    const posts = await prisma.post.findMany({
      where: {
        tags: {
          some: {
            id: params.tagId,
          },
        },
      },
      select: {
        id: true,
        title: true,
        thumbnail: true,
        preview: true,
        createdAt: true,
        readTime: true,
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

  private async exist(value: string) {
    const exist = await prisma.tag.findFirst({
      where: {
        value,
      },
    });

    if (exist) {
      throw new Error('이미 존재하는 태그입니다.');
    }

    return exist;
  }
}

export const tagRepository = new TagRepositoryImpl();
