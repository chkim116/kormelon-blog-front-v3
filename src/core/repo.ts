import { authRepository } from './repository/auth.repo';
import { categoryRepository } from './repository/category.repo';

export const repo = {
  auth: authRepository,
  category: categoryRepository,
};
