import { categoryRepository } from '@core/repositories/category.repo';
import { CategoryServiceImpl } from './category.service';

export const categoryService = new CategoryServiceImpl(categoryRepository);
