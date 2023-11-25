import { postRepository } from '@server/repositories/post.repo';
import { BlogWriteService } from './blogWrite.service';

export const blogWriteService = new BlogWriteService(postRepository);
