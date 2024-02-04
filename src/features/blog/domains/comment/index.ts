import { commentRepository } from '@core/repositories/comment.repo';
import { CommentServiceImpl } from './comment.service';

export const commentService = new CommentServiceImpl(commentRepository);
