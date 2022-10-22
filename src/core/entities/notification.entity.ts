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
  commentId: number;
  /**
   * 읽음 여부
   */
  isRead: boolean;
  /**
   * 생성일
   */
  createdAt: string;
}
