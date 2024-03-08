import {
  createMockFunctionWithRejectedValue,
  createMockFunctionWithResolvedValue,
} from '@fixtures/tests';
import { NotificationSearchEntity } from '@core/entities';
import { HttpError } from '@core/lib/network/HttpError';
import { NotificationRepository } from '@core/repositories/notification.repo.type';
import { NotificationServiceImpl } from '../notification.service';

const notificationRepository: NotificationRepository = {
  fetchList: jest.fn(),
  readNoti: jest.fn(),
  createNoti: jest.fn(),
};

const notificationService = new NotificationServiceImpl(notificationRepository);

describe('NotificationService 성공 케이스', () => {
  const USER_ID = '123';

  it('알림 조회', async () => {
    const response: NotificationSearchEntity[] = [
      {
        id: 1,
        postId: 1,
        commentId: '1',
        isRead: false,
        message: '',
        createdAt: new Date(),
      },
    ];
    notificationRepository.fetchList =
      createMockFunctionWithResolvedValue(response);

    const results = await notificationService.fetchNoti(USER_ID);
    expect(notificationRepository.fetchList).toHaveBeenCalledWith(USER_ID);
    expect(results).toEqual(response);
  });

  it('알림 읽기', async () => {
    notificationRepository.readNoti = createMockFunctionWithResolvedValue();

    const id = 1;
    await notificationService.readNoti(id, USER_ID);

    expect(notificationRepository.readNoti).toHaveBeenCalledWith(id, USER_ID);
  });
});

describe('NotificationService 실패 케이스', () => {
  const USER_ID = '123';

  it('알림 조회 실패', async () => {
    notificationRepository.fetchList = createMockFunctionWithRejectedValue(
      new HttpError('에러'),
    );

    await expect(() =>
      notificationService.fetchNoti(USER_ID),
    ).rejects.toMatchObject({
      message: '에러',
    });
    expect(notificationRepository.fetchList).toHaveBeenCalled();
  });

  it('알림 읽기 실패', async () => {
    notificationRepository.readNoti = createMockFunctionWithRejectedValue(
      new HttpError('에러'),
    );

    const id = 1;

    await expect(() =>
      notificationService.readNoti(id, USER_ID),
    ).rejects.toMatchObject({
      message: '에러',
    });
    expect(notificationRepository.readNoti).toHaveBeenCalledWith(id, USER_ID);
  });
});
