import { faker } from '@faker-js/faker';
import { CategoryModel } from '@domain/uiStates';

function getCategories(length = 3) {
  return Array.from({ length }, () => {
    const categoryId = faker.number.int();
    const categoryValue = faker.lorem.word();

    const result: CategoryModel = {
      id: categoryId,
      value: categoryValue,
      posts: faker.number.int(30),
      subCategories: [
        {
          id: faker.number.int(),
          category: {
            id: categoryId,
            value: categoryValue,
          },
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
