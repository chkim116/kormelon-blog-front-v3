import { postRepository } from '@core/repositories/post.repo';
import { BlogSearchServiceImpl } from './blogSearch.service';

export const blogSearchService = new BlogSearchServiceImpl(postRepository);
