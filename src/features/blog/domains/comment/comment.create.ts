import {
  CommentCreateUiParams,
  CommentUpdateUiParams,
} from './comment.uiState';

export function createCommentCreateUiParams(): CommentCreateUiParams {
  return {
    userId: '',
    postId: 0,
    commentValue: '',
    password: '',
    username: '',
  };
}

export function createCommentUpdateUiParams(): CommentUpdateUiParams {
  return {
    userId: '',
    commentId: '',
    commentValue: '',
    password: '',
    postId: 0,
  };
}
