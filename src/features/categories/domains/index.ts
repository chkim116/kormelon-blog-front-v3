import { categoryRepository } from '@features/categories/repositories/category.repo';
import { CategoryServiceImpl } from './category.service';

export const categoryService = new CategoryServiceImpl(categoryRepository);
