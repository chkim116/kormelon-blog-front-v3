import {
  CommentCreateParams,
  CommentDeleteParams,
  CommentExistEntity,
  CommentReplyCreateParams,
  CommentReplyDeleteParams,
  CommentReplyExistEntity,
  CommentReplyUpdateParams,
  CommentSearchEntity,
  CommentUpdateParams,
} from '@core/entities';
import prisma from '@core/lib/prisma';
import { prismaResolveHandler } from '@core/lib/network/payloadHandler';
import { createHashPassword } from '@core/lib/createHashPassword';
import { CommentRepository } from './comment.repo.type';
import { authRepository } from './auth.repo';
import { notificationRepository } from './notification.repo';

class CommentRepositoryImpl implements CommentRepository {
  /**
   * 댓글이 존재하는지 확인한다.
   */
  async existComment(id: string) {
    const comment = await prisma.comment.findUnique({
      where: {
        id,
      },
    });

    if (!comment) {
      return prismaResolveHandler(null);
    }

    const result: CommentExistEntity = {
      postId: comment.postId,
      value: comment.value,
      password: comment.password,
      username: comment.username,
      userId: comment.userId,
      id: comment.id,
      isAnonymous: comment.isAnonymous,
    };

    return prismaResolveHandler(result);
  }

  /**
   * 대댓글이 존재하는지 확인한다.
   */
  async existCommentReply(id: string) {
    const comment = await prisma.commentReply.findUnique({
      where: {
        id,
      },
    });

    if (!comment) {
      return prismaResolveHandler(null);
    }

    const result: CommentReplyExistEntity = {
      commentId: comment.commentId,
      value: comment.value,
      password: comment.password,
      username: comment.username,
      userId: comment.userId,
      id: comment.id,
      isAnonymous: comment.isAnonymous,
    };

    return prismaResolveHandler(result);
  }

  /**
   * 댓글을 가져온다
   *
   * @param postId
   * @returns
   */
  async fetchComments(postId: number) {
    const comments: CommentSearchEntity[] = await prisma.comment.findMany({
      where: {
        postId: postId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        value: true,
        username: true,
        userId: true,
        isAnonymous: true,
        createdAt: true,
        deletedAt: true,
        user: {
          select: {
            username: true,
            profileImage: true,
          },
        },
        commentReply: {
          select: {
            id: true,
            value: true,
            userId: true,
            username: true,
            isAnonymous: true,
            createdAt: true,
            deletedAt: true,
            user: {
              select: {
                username: true,
                profileImage: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    return prismaResolveHandler(comments);
  }

  /**
   * 댓글을 생성한다.
   *
   * @param params
   * @returns
   */
  async createComment(params: CommentCreateParams) {
    const { postId, value, password = '', username = '익명', userId } = params;

    const { hash } = await createHashPassword(password);
    const hashedPassword = await hash();
    const isAnonymous = !userId;

    if (isAnonymous) {
      await prisma.comment.create({
        data: {
          postId,
          value,
          password: hashedPassword,
          username,
          userId: null,
          isAnonymous,
        },
      });
    } else {
      const { payload: user } = await authRepository.findUserId(userId);

      if (!user) {
        throw new Error('잘못된 유저 식별자입니다.');
      }

      await prisma.comment.create({
        data: {
          postId,
          value,
          password: hashedPassword,
          userId,
          username: user.username,
          isAnonymous,
        },
      });
    }

    // // TODO: 댓글이 달리면 게시글 작성자에게 알림을 생성해야함.
    // const isAuthor = await postService().checkAuthor(postId, user?.id || '');

    // if (!isAuthor) {
    //   const { id, userId, title } = await postService().exist(postId);

    //   await notificationService().createNotification({
    //     message: `${username}님이 게시글 - ${title}에 댓글을 작성하였습니다.`,
    //     commentId: newComment.id,
    //     userId,
    //     postId: id,
    //   });
    // }

    return prismaResolveHandler();
  }

  /**
   * 댓글을 수정한다.
   *
   * @param params
   * @returns
   */
  async updateComment(params: CommentUpdateParams) {
    const { payload: existComment } = await this.existComment(params.id);

    if (!existComment) {
      throw new Error('존재하지 않는 댓글입니다.');
    }

    const { compare } = await createHashPassword(params.password || '');

    if (existComment.isAnonymous) {
      const isPasswordCorrect = await compare(existComment.password || '');

      if (!isPasswordCorrect) {
        throw new Error('비밀번호가 틀립니다.');
      }
    } else {
      if (existComment.userId !== params.userId) {
        throw new Error('댓글을 작성한 유저가 아닙니다.');
      }
    }

    await prisma.comment.update({
      where: {
        id: params.id,
      },
      data: {
        value: params.value,
      },
    });

    return prismaResolveHandler();
  }

  /**
   * 댓글을 삭제한다.
   *
   * @param params
   * @returns
   */
  async deleteComment(params: CommentDeleteParams) {
    const { payload: existComment } = await this.existComment(params.id);

    if (!existComment) {
      throw new Error('존재하지 않는 댓글입니다.');
    }

    const { compare } = await createHashPassword(params.password || '');

    if (existComment.isAnonymous) {
      const isPasswordCorrect = await compare(existComment.password || '');

      if (!isPasswordCorrect) {
        throw new Error('비밀번호가 틀립니다.');
      }
    } else {
      if (existComment.userId !== params.userId) {
        throw new Error('댓글을 작성한 유저가 아닙니다.');
      }
    }

    await prisma.comment.update({
      where: {
        id: params.id,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    return prismaResolveHandler();
  }

  /**
   * 하위 댓글을 생성한다.
   * @param params
   * @returns
   */
  async createCommentReply(params: CommentReplyCreateParams) {
    const {
      commentId,
      value,
      password = '',
      userId = null,
      username = '익명',
    } = params;

    const { hash } = await createHashPassword(password);
    const hashedPassword = await hash();
    const isAnonymous = !userId;

    if (isAnonymous) {
      await prisma.commentReply.create({
        data: {
          commentId,
          value,
          password: hashedPassword,
          username,
          userId: null,
          isAnonymous,
        },
      });
    } else {
      const { payload: user } = await authRepository.findUserId(userId);

      if (!user) {
        throw new Error('잘못된 유저 식별자입니다.');
      }

      await prisma.commentReply.create({
        data: {
          commentId,
          value,
          password: hashedPassword,
          userId,
          username: user.username,
          isAnonymous,
        },
      });
    }

    const { payload: comment } = await this.existComment(commentId);

    if (comment) {
      await notificationRepository.createNoti({
        message: `${username}님이 댓글에 대댓글을 작성하였습니다.`,
        commentId,
        targetUserId: comment.userId,
        postId: comment.postId,
      });
    }

    return prismaResolveHandler();
  }

  /**
   * 하위 댓글을 수정한다.
   * @param params
   * @returns
   */
  async updateCommentReply(params: CommentReplyUpdateParams) {
    const { payload: existCommentReply } = await this.existCommentReply(
      params.id,
    );

    if (!existCommentReply) {
      throw new Error('존재하지 않는 댓글입니다.');
    }

    const { compare } = await createHashPassword(params.password || '');

    if (existCommentReply.isAnonymous) {
      const isPasswordCorrect = await compare(existCommentReply.password || '');

      if (!isPasswordCorrect) {
        throw new Error('비밀번호가 틀립니다.');
      }
    } else {
      if (existCommentReply.userId !== params.userId) {
        throw new Error('댓글을 작성한 유저가 아닙니다.');
      }
    }

    await prisma.commentReply.update({
      where: {
        id: params.id,
      },
      data: {
        value: params.value,
      },
    });

    return prismaResolveHandler();
  }

  /**
   * 하위 댓글을 삭제한다.
   * @param params
   * @returns
   */
  async deleteCommentReply(params: CommentReplyDeleteParams) {
    const { payload: existCommentReply } = await this.existCommentReply(
      params.id,
    );

    if (!existCommentReply) {
      throw new Error('존재하지 않는 댓글입니다.');
    }

    const { compare } = await createHashPassword(params.password || '');

    if (existCommentReply.isAnonymous) {
      const isPasswordCorrect = await compare(existCommentReply.password || '');

      if (!isPasswordCorrect) {
        throw new Error('비밀번호가 틀립니다.');
      }
    } else {
      if (existCommentReply.userId !== params.userId) {
        throw new Error('댓글을 작성한 유저가 아닙니다.');
      }
    }

    await prisma.commentReply.delete({
      where: {
        id: params.id,
      },
    });

    return prismaResolveHandler();
  }
}

export const commentRepository = new CommentRepositoryImpl();
