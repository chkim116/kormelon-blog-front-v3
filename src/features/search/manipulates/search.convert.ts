import dayjs from 'dayjs';
import { BlogPostEntity } from '@core/entities';
import { SearchPostModel } from '../model';

export function refinePostReadingTime(time: number) {
  return time + ' minute read';
}

export function refinePostCreatedAt(createdAt: string) {
  return dayjs(createdAt).format('LL');
}

export function toSearchPostModels(
  entities: BlogPostEntity[],
): SearchPostModel[] {
  return entities.map((entity) => ({
    ...entity,
    createdAt: refinePostCreatedAt(entity.createdAt),
    readTime: refinePostReadingTime(entity.readTime),
  }));
}
