import { TagEntity, TagWithPostEntity } from '@core/entities';
import { TagModel, TagWithPostModel } from '../models';

export function toTagModels(entities: TagEntity[]): TagModel[] {
  return entities.map((entity) => entity);
}

export function toTagWithPostModels(
  entities: TagWithPostEntity[],
): TagWithPostModel[] {
  return entities.map((entity) => ({
    ...entity,
    posts: entity.posts.map((post) => post.id),
  }));
}
