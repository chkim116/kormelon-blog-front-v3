import { BlogPostDetailModel } from '@domain/uiStates';
import { BlogPostCreateParams } from '@server/entities';

export function refineBlogWriteParams(raw: Record<string, string>) {
  return {
    editId: isFinite(Number(raw.edit)) ? Number(raw.edit) : 0,
    isPrivateMode: raw.isPrivate === 'true' ? true : false,
  };
}

export function toBlogPostCreateParams(
  post: BlogPostDetailModel,
): BlogPostCreateParams {
  const { category, content, isPrivate, preview, thumbnail, tags, title } =
    post;

  return {
    categoryId: category.id,
    subCategoryId: category.subCategoryId,
    tags: tags.map((tag) => tag.id),
    content: content,
    isPrivate: isPrivate,
    preview: preview,
    thumbnail: thumbnail,
    title: title,
  };
}
