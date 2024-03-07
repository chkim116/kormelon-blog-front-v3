import {
  NotificationCreateParams,
  NotificationSearchEntity,
} from '@core/entities';
import prisma from '@core/lib/prisma';
import { prismaResolveHandler } from '@core/lib/network/payloadHandler';
import { NotificationRepository } from './notification.repo.type';

class NotificationRepositoryImpl implements NotificationRepository {
  /**
   * 알림을 생성한다.
   */
  async createNoti(params: NotificationCreateParams) {
    await prisma.notification.create({
      data: {
        userId: params.targetUserId,
        postId: params.postId,
        commentId: params.commentId,
        message: params.message,
      },
    });

    return prismaResolveHandler();
  }

  /**
   * 알림을 가져온다.
   * @returns
   */
  async fetchList(userId: string) {
    const notifications: NotificationSearchEntity[] =
      await prisma.notification.findMany({
        where: {
          userId,
          isRead: false,
        },
        select: {
          id: true,
          postId: true,
          commentId: true,
          isRead: true,
          message: true,
          createdAt: true,
        },
        orderBy: {
          id: 'desc',
        },
      });

    return prismaResolveHandler(notifications);
  }

  /**
   * 알림을 읽는다.
   * @param id
   * @returns
   */
  async readNoti(id: number, userId: string) {
    await this.exist(id, userId);

    await prisma.notification.update({
      where: {
        id,
      },
      data: {
        isRead: true,
      },
    });

    return prismaResolveHandler();
  }

  /**
   * 알림이 존재하는지 확인한다.
   *
   * @param id
   * @returns
   */
  private async exist(id: number, userId: string) {
    const exist = await prisma.notification.findUnique({
      where: { id, userId },
    });

    if (!exist) {
      throw new Error('존재하지 않는 알림입니다.');
    }

    return exist;
  }
}

export const notificationRepository = new NotificationRepositoryImpl();
