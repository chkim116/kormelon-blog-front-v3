import { postRepository } from '@core/repositories/post.repo';
import { fileRepository } from '@core/repositories/file.repo';
import { BlogWriteService } from './blogWrite.service';

export const blogWriteService = new BlogWriteService(
  postRepository,
  fileRepository,
);
