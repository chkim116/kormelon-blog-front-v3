import { faker } from '@faker-js/faker';
import { PostDetailNearPostEntity, PostSearchEntity } from '@shared/entities';
import { toBlogSearchUiStates } from '@features/blog/domains/search/blogSearch.convert';
import { BlogDetailUiState } from '@features/blog/domains/detail/blogDetail.uiState';
import { userFixtures } from './user.fixtures';

function getBlogList(length = 6) {
  const results: PostSearchEntity[] = Array.from({ length }, () => {
    const result: PostSearchEntity = {
      id: faker.number.int(),
      title: faker.lorem.sentence(),
      thumbnail: faker.image.dataUri(),
      preview: faker.lorem.paragraphs(),
      createdAt: faker.date.anytime().toString(),
      readTime: faker.number.int({ max: 20 }),
    };

    return result;
  });

  return toBlogSearchUiStates(results);
}

function getBlogDetail() {
  const result: BlogDetailUiState = {
    readTime: '3 min read',
    category: {
      id: faker.number.int(),
      value: faker.lorem.word(),
      subCategoryId: faker.number.int(),
      subCategoryValue: faker.lorem.word(),
    },
    view: faker.number.int(),
    like: faker.number.int(),
    content: faker.lorem.paragraphs({ min: 10, max: 99 }),
    user: userFixtures.getUser(),
    tags: [],
    isPrivate: false,
    id: faker.number.int(),
    title: faker.lorem.slug(),
    thumbnail: faker.image.dataUri(),
    preview: faker.lorem.paragraph(),
    createdAt: faker.date.anytime().toString(),
  };

  return result;
}

function getNearPost() {
  const nearPost: PostDetailNearPostEntity = {
    id: faker.number.int(),
    title: faker.lorem.paragraph(),
    thumbnail: faker.image.dataUri(),
    createdAt: faker.date.anytime().toString(),
  };

  return {
    next: nearPost,
    prev: nearPost,
  };
}

export const blogFixtures = { getBlogList, getNearPost, getBlogDetail };
