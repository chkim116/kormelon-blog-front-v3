export interface BaseCommentCreateParams {
  /**
   * 댓글 값
   */
  value: string;
  /**
   * (익명시) 유저 이름
   * 익명이 아니면 보내지 않아도 된다.
   */
  username?: string;
  /**
   * (익명시) 비밀번호
   * 익명이 아니면 보내지 않아도 된다.
   */
  password?: string;
}

export interface CommentCreateParams extends BaseCommentCreateParams {
  /**
   * 게시글 아이디
   */
  postId: number;
}

export interface CommentUpdateParams extends CommentCreateParams {
  /**
   * 댓글 아이디
   */
  id: string;
}

export interface CommentDeleteParams {
  /**
   * 댓글 아이디
   */
  id: string;
  /**
   * 댓글 비밀번호
   * 익명이 아니라면 빈 스트링을 보내면 된다.
   */
  password: string;
}

export interface CommentReplyCreateParams extends BaseCommentCreateParams {
  /**
   * 상위 댓글의 아이디
   */
  commentId: string;
  /**
   * 게시글 아이디
   */
  postId: number;
}

export interface CommentReplyUpdateParams extends BaseCommentCreateParams {
  /**
   * 하위 댓글의 아이디
   */
  id: string;
  /**
   * 게시글 아이디
   */
  postId: number;
}

export interface CommentReplyDeleteParams extends CommentDeleteParams {}

export interface CommentReplySearchEntity {
  /**
   * 댓글의 아이디
   */
  id: string;
  /**
   * 댓글 값
   */
  value: string;
  /**
   * 익명 여부
   */
  isAnonymous: boolean;
  /**
   * 유저 아이디
   * 익명이면 null이다.
   */
  userId: string | null;
  /**
   * 유저 이름
   * 익명이라면 '익명'이 기본이다.
   */
  username: string;

  /**
   * 생성 일자
   */
  createdAt: string;
  /**
   * 삭제 일자
   */
  deletedAt: string | null;
}

export interface CommentSearchEntity extends CommentReplySearchEntity {
  /**
   * 하위 댓글 목록
   */
  commentReplies: CommentReplySearchEntity[];
}
