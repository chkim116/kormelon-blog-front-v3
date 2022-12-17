import gravatar from 'gravatar';
import { BaseCommentCreateParamsModel } from '../models';

export function createBlogPostCommentCreateParamsModel(): BaseCommentCreateParamsModel {
  return {
    commentValue: '',
    password: '',
    username: '',
  };
}

export function createCommentProfileImage(name: string) {
  return gravatar.url(name, {
    s: '100',
    r: 'pg',
    d: 'retro',
    protocol: 'http',
  });
}
