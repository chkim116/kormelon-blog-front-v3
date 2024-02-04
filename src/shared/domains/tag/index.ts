import { tagRepository } from '@core/repositories/tag.repo';
import { TagServiceImpl } from './tag.service';

export const tagService = new TagServiceImpl(tagRepository);
