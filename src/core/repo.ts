import { authRepository } from './repository/auth.repo';
import { categoryRepository } from './repository/category.repo';
import { commentRepository } from './repository/comment.repo';
import { notificationRepository } from './repository/notification.repo';
import { postRepository } from './repository/post.repo';
import { tagRepository } from './repository/tag.repo';
import { viewRepository } from './repository/view.repo';

export const repo = {
  auth: authRepository,
  category: categoryRepository,
  post: postRepository,
  tag: tagRepository,
  notification: notificationRepository,
  comment: commentRepository,
  view: viewRepository,
};
