import { faker } from '@faker-js/faker';
import { AuthUserUiState } from '@domain/auth/auth.uiState';
import { AuthRoleEnum } from '@server/entities';

function getUser(isAdmin = false) {
  const result: AuthUserUiState = {
    id: faker.string.uuid(),
    profileImage: faker.image.avatar(),
    username: faker.person.fullName(),
    role: isAdmin ? AuthRoleEnum.ADMIN : AuthRoleEnum.MEMBER,
  };

  return result;
}

export const userFixtures = {
  getUser,
};
