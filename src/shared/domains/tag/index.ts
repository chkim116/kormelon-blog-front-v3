import { tagRepository } from '@shared/repositories/tag.repo';
import { TagServiceImpl } from './tag.service';

export const tagService = new TagServiceImpl(tagRepository);
