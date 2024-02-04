import {
  NotificationCreateParams,
  NotificationSearchEntity,
  PromisePrismaResolveResponse,
} from '@core/entities';

export interface NotificationRepository {
  /**
   * 알림을 가져온다.
   * @returns
   */
  fetchList(
    userId: string,
  ): PromisePrismaResolveResponse<NotificationSearchEntity[]>;

  /**
   * 알림을 읽는다.
   * @param id
   * @returns
   */
  readNoti(id: number, userId: string): PromisePrismaResolveResponse;

  /**
   * 알림 생성
   *
   * comment 작성 -> 게시글 작성자에게 알림을 저장
   * commentReply 작성 -> 댓글 작성자에게 알림을 저장
   *
   * @param params
   */
  createNoti(params: NotificationCreateParams): PromisePrismaResolveResponse;
}
