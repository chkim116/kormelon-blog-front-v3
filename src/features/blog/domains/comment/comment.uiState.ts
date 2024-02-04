export interface CommentSearchUiParams {
  /**
   * 댓글이 작성된 게시글 식별자
   */
  postId: number;
  /**
   * 해당 페이지 접속한 알림 식별자
   */
  notificationId: number;
}

export interface CommentReplySearchUiState {
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
   * 익명이면 빈 스트링일 것이다.
   */
  userId: string;
  /**
   * 유저 이름
   * 익명이라면 '익명'이 기본이다.
   */
  username: string;
  /**
   * 유저의 프로필 이미지
   */
  userProfile: string;
  /**
   * 생성 일자
   */
  createdAt: string;
  /**
   * 삭제 여부
   */
  isDeleted: boolean;
}

export interface CommentSearchUiState extends CommentReplySearchUiState {
  /**
   * 하위 댓글 목록
   */
  commentReplies: CommentReplySearchUiState[];
}

export interface CommentCreateUiParams {
  /**
   * 유저 식별자
   *
   * 익명이라면 빈 값이다.
   */
  userId: string;
  /**
   * 게시글 식별자
   */
  postId: number;
  /**
   * 댓글 값
   */
  commentValue: string;
  /**
   * 유저 이름
   */
  username: string;
  /**
   * 익명시 비밀번호
   */
  password: string;
}

export interface CommentUpdateUiParams {
  /**
   * 유저 식별자
   *
   * 익명이라면 빈 값이다.
   */
  userId: string;
  /**
   * 댓글 아이디
   */
  commentId: string;
  /**
   * 게시글 식별자
   */
  postId: number;
  /**
   * 댓글 값
   */
  commentValue: string;
  /**
   * 익명시 비밀번호
   */
  password: string;
}

export interface CommentDeleteUiParams {
  /**
   * 유저 식별자
   *
   * 익명이라면 빈 값이다.
   */
  userId: string;
  /**
   * 삭제되는 댓글의 게시글 아이디
   *
   * 서버로 보낼 시 필요한 필드는 아니지만 댓글 재로딩을 위하여 필요함.
   */
  postId: number;
  /**
   * 댓글 아이디
   */
  commentId: string;
  /**
   * 익명시 비밀번호
   * 익명이 아니라면 빈 스트링이다.
   */
  password: string;
}

export interface CommentReplyCreateUiParams extends CommentCreateUiParams {
  /**
   * 상위 댓글의 아이디
   */
  commentId: string;
}

export interface CommentReplyUpdateUiParams extends CommentUpdateUiParams {}

export interface CommentReplyDeleteUiParams extends CommentDeleteUiParams {}
