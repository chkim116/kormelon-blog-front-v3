import { faker } from '@faker-js/faker';
import { CategorySearchUiState } from '@domain/category/category.uiState';

function getCategories(length = 3) {
  return Array.from({ length }, () => {
    const categoryId = faker.number.int();
    const categoryValue = faker.lorem.word();

    const result: CategorySearchUiState = {
      id: categoryId,
      value: categoryValue,
      posts: faker.number.int(30),
      subCategories: [
        {
          id: faker.number.int(),
          value: faker.lorem.word(),
        },
      ],
    };

    return result;
  });
}

export const categoryFixtures = {
  getCategories,
};
