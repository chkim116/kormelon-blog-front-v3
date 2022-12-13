import {
  BaseCommentCreateParams,
  BlogPostDetailEntity,
  BlogPostDetailNearPost,
} from '@core/entities';
import { BlogPostCategoryModel } from './blog.model';

export interface BlogPostDetailModel
  extends Omit<BlogPostDetailEntity, 'readTime' | 'category' | 'subCategory'> {
  /**
   * 읽기 위해 예상되는 분 단위의 시간 값
   */
  readTime: string;
  /**
   * 카테고리
   *
   * 서브 카테고리의 정보가 함께있다.
   */
  category: BlogPostCategoryModel;
}

export interface BlogPostDetailResultPayload {
  /**
   * 현재 게시글의 상세
   */
  post: BlogPostDetailModel;
  /**
   * 이전 게시글
   *
   * 기준은 카테고리 기준 다음 글이다.
   */
  prev: BlogPostDetailNearPost;
  /**
   * 다음 게시글
   *
   * 기준은 카테고리 기준 다음 글이다.
   */
  next: BlogPostDetailNearPost;
}

export interface BlogPostAnchorModel {
  /**
   * 앵커로 활용될 h1의 id 값
   */
  id: string;
  /**
   * 앵커로 활용될 h1의 텍스트 값
   */
  value: string;
}

export interface BlogPostCommentReplySearchModel {
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
   * 비밀번호
   * 항상 빈 스트링 값이다. 실제 비교는 서버에서 진행함.
   */
  password: string;
  /**
   * 생성 일자
   */
  createdAt: string;
  /**
   * 삭제 일자
   */
  deletedAt: string;
}

export interface BlogPostCommentSearchModel
  extends BlogPostCommentReplySearchModel {
  /**
   * 하위 댓글 목록
   */
  commentReplies: BlogPostCommentReplySearchModel[];
}

export interface BlogPostCommentCreateParamsModel {
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

export interface BlogPostCommentUpdateParamsModel {
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
   * 유저 이름
   *
   * 현재(22.12.11) 유저 이름은 수정 불가임.
   */
  username?: string;
  /**
   * 익명시 비밀번호
   */
  password: string;
}

export interface BlogPostCommentDeleteParamsModel {
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

export interface BlogPostCommentReplyCreateParamsModel
  extends BlogPostCommentCreateParamsModel {
  /**
   * 상위 댓글의 아이디
   */
  commentId: string;
}

export interface BlogPostCommentReplyUpdateParamsModel
  extends BlogPostCommentUpdateParamsModel {}

export interface BlogPostCommentReplyDeleteParamsModel
  extends BlogPostCommentDeleteParamsModel {}

export interface BaseCommentCreateParamsModel
  extends Required<Omit<BaseCommentCreateParams, 'value'>> {
  commentValue: string;
}
