import { faker } from '@faker-js/faker';
import { toNumber } from 'safers';
import { CategorySearchUiState } from '@features/categories/domains/category.uiState';

function getCategories(length = 3, subLength = 3) {
  return Array.from({ length }, () => {
    const categoryId = faker.number.int();
    const categoryValue = faker.lorem.word();

    const result: CategorySearchUiState = {
      id: categoryId,
      value: categoryValue,
      posts: faker.number.int(30),
      ordering: toNumber((Math.random() * 10).toFixed()),
      subCategories: Array.from({ length: subLength }, () => ({
        id: faker.number.int(),
        value: faker.lorem.word(),
        ordering: toNumber((Math.random() * 10).toFixed()),
      })).sort((a, b) => a.ordering - b.ordering),
    };

    return result;
  }).sort((a, b) => a.ordering - b.ordering);
}

export const categoryFixtures = {
  getCategories,
};
