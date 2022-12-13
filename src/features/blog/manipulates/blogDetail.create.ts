import { BaseCommentCreateParamsModel } from '../models';

export function createBlogPostCommentCreateParamsModel(): BaseCommentCreateParamsModel {
  return {
    commentValue: '',
    password: '',
    username: '',
  };
}
