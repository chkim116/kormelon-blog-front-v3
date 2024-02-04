export interface NotificationCreateParams {
  /**
   * 작성된 댓글이 위치한 게시글 id
   */
  postId: number;
  /**
   * 작성한 댓글 id
   *
   * comment 생성 시 notification이 저장된다.
   */
  commentId: string;
  /**
   * 알림이 저장될 유저의 id 값
   */
  targetUserId: string | null;
  /**
   * 알림 메시지
   */
  message: string;
}

export interface NotificationSearchEntity {
  /**
   * 알림 식별자
   */
  id: number;
  /**
   * 코멘트가 등록된 게시글 식별자
   */
  postId: number;
  /**
   * 등록된 코멘트 식별자
   */
  commentId: string;
  /**
   * 읽음 여부
   */
  isRead: boolean;
  /**
   * 알림의 메시지
   */
  message: string;
  /**
   * 생성일
   */
  createdAt: Date;
}
