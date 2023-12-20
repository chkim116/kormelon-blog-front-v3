import {
  CommentCreateUiParams,
  CommentUpdateUiParams,
} from './comment.uiState';

export function createCommentCreateUiParams(): CommentCreateUiParams {
  return {
    postId: 0,
    commentValue: '',
    password: '',
    username: '',
  };
}

export function createCommentUpdateUiParams(): CommentUpdateUiParams {
  return {
    commentId: '',
    commentValue: '',
    password: '',
    postId: 0,
  };
}
