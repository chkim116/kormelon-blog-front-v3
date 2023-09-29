import gravatar from 'gravatar';
import { BaseCommentCreateParamsModel } from '@domain/uiStates';

export function createBlogPostCommentCreateParamsModel(): BaseCommentCreateParamsModel {
  return {
    id: '',
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
