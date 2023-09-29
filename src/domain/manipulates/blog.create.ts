import { DEFAULT_IMAGE } from '@shared/constants';
import { env } from '@core/env';
import { BlogPostCreateParams } from '@server/entities';
import { BlogPostAnchorModel, BlogPostDetailModel } from '../uiStates';
import { refinePostReadingTime } from './blog.convert';

export function createBlogPostDetailModel(): BlogPostDetailModel {
  return {
    content: '',
    user: {
      id: '',
      profileImage: '',
      username: '',
    },
    tags: [],
    id: 0,
    title: '',
    thumbnail: '',
    view: 0,
    like: 0,
    category: {
      id: 0,
      value: '',
      subCategoryId: 0,
      subCategoryValue: '',
    },
    createdAt: '',
    preview: '',
    readTime: refinePostReadingTime(0),
    isPrivate: false,
  };
}

export function createContentAnchorPositionMap(
  anchors: BlogPostAnchorModel[],
  farAwayHeight = 0,
) {
  if (env.isSSR || !anchors.length) {
    return;
  }

  const anchorPositionMap: Record<string, number> = {};

  for (const anchor of anchors) {
    try {
      const anchorDom = document.getElementById(anchor.id);

      if (anchorDom) {
        anchorPositionMap[anchor.id] =
          farAwayHeight + anchorDom.offsetTop - 200;
      }
    } catch (err) {
      //
    }
  }

  return anchorPositionMap;
}

export function createBlogPostCreateParams(): BlogPostCreateParams {
  return {
    preview: '',
    thumbnail: DEFAULT_IMAGE,
    title: '',
    content: '',
    tags: [],
    categoryId: 0,
    subCategoryId: 0,
    isPrivate: false,
  };
}
