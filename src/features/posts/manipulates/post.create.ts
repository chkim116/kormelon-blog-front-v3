import { DEFAULT_IMAGE } from '@common/constants';
import { env } from '@common/env';
import { PostCreateParams } from '@core/entities';
import { AnchorModel, PostDetailModel } from '../models/post.model';
import { refineReadingTime } from './post.convert';

export function createPostDetailModel(): PostDetailModel {
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
    readTime: refineReadingTime(0),
    isPrivate: false,
  };
}

export function createContentAnchorPositionMap(anchors: AnchorModel[]) {
  if (env.isSSR || !anchors.length) {
    return;
  }

  const anchorPositionMap: Record<string, number> = {};

  for (const anchor of anchors) {
    const anchorDom = document.getElementById(anchor.id);

    if (anchorDom) {
      anchorPositionMap[anchor.id] = anchorDom.offsetTop - 200;
    }
  }

  return anchorPositionMap;
}

export function createPostCreateParams(): PostCreateParams {
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
