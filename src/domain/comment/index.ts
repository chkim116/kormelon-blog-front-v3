import { commentRepository } from '@server/repositories/comment.repo';
import { CommentServiceImpl } from './comment.service';

export const commentService = new CommentServiceImpl(commentRepository);
