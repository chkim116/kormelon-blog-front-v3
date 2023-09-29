import { BlogPostEntity } from '@server/entities';
import { SearchPostModel } from '../uiStates';
import { refinePostCreatedAt, refinePostReadingTime } from '.';

export function toSearchPostModels(
  entities: BlogPostEntity[],
): SearchPostModel[] {
  return entities.map((entity) => ({
    ...entity,
    createdAt: refinePostCreatedAt(entity.createdAt),
    readTime: refinePostReadingTime(entity.readTime),
  }));
}
