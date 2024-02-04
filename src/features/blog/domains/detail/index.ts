import { postRepository } from '@core/repositories/post.repo';
import { BlogDetailServiceImpl } from './blogDetail.service';

export const blogDetailService = new BlogDetailServiceImpl(postRepository);
