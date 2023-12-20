import { postRepository } from '@features/blog/repositories/post.repo';
import { BlogWriteService } from './blogWrite.service';

export const blogWriteService = new BlogWriteService(postRepository);
