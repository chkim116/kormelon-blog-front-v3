import { authRepository } from './repository/auth.repo';
import { categoryRepository } from './repository/category.repo';
import { postRepository } from './repository/post.repo';
import { tagRepository } from './repository/tag.repo';

export const repo = {
  auth: authRepository,
  category: categoryRepository,
  post: postRepository,
  tag: tagRepository,
};
