import { categoryRepository } from '@server/repositories/category.repo';
import { CategoryServiceImpl } from './category.service';

export const categoryService = new CategoryServiceImpl(categoryRepository);
