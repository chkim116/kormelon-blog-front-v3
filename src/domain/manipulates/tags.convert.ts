import { TagEntity, TagWithPostEntity } from '@server/entities';
import { TagModel, TagWithPostModel } from '@domain/uiStates';

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
