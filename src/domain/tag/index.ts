import { tagRepository } from '@server/repositories/tag.repo';
import { TagServiceImpl } from './tag.service';

export const tagService = new TagServiceImpl(tagRepository);
