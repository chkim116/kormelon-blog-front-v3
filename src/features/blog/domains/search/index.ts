import { postRepository } from '@features/blog/repositories/post.repo';
import { BlogSearchServiceImpl } from './blogSearch.service';

export const blogSearchService = new BlogSearchServiceImpl(postRepository);
