import { postRepository } from '@features/blog/repositories/post.repo';
import { BlogDetailServiceImpl } from './blogDetail.service';

export const blogDetailService = new BlogDetailServiceImpl(postRepository);
