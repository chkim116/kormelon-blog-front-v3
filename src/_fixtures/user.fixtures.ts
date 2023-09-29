import { faker } from '@faker-js/faker';
import { UserModel } from '@domain/uiStates';
import { UserRoleEnum } from '@server/entities';

function getUser(isAdmin = false) {
  const result: UserModel = {
    id: faker.string.uuid(),
    profileImage: faker.image.avatar(),
    username: faker.person.fullName(),
    role: isAdmin ? UserRoleEnum.ADMIN : UserRoleEnum.MEMBER,
  };

  return result;
}

export const userFixtures = {
  getUser,
};
