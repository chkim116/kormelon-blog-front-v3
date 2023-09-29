import { authRepository } from './repositories/auth.repo';
import { categoryRepository } from './repositories/category.repo';
import { commentRepository } from './repositories/comment.repo';
import { notificationRepository } from './repositories/notification.repo';
import { postRepository } from './repositories/post.repo';
import { tagRepository } from './repositories/tag.repo';
import { viewRepository } from './repositories/view.repo';

export const repo = {
  auth: authRepository,
  category: categoryRepository,
  post: postRepository,
  tag: tagRepository,
  notification: notificationRepository,
  comment: commentRepository,
  view: viewRepository,
};
